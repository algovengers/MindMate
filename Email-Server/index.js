const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))

const port = process.env.PORT || 8800

app.listen(port,()=>{
	console.log(`Email Server started at ${port}`)
})
