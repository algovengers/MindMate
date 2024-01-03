const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cron = require('node-cron')
const {sendWelcomeEmail, sendScheduledEmails} = require('./Controller/email.controller')
const connectDB = require('./database/ConnectDb')

cron.schedule('31 19 * * *',()=>{
	//Pick data from Database and send emails to users
	sendScheduledEmails()
    console.log("DOne");
},{
    timezone : 'Asia/Kolkata'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post('/welcomeEmail',sendWelcomeEmail)
connectDB()


app.listen(8888,()=>{
    console.log("Server Started");
})