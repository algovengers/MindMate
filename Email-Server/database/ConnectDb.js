const mongoose = require('mongoose')

async function connectDB(){
    return mongoose.connect(process.env.MONGO_URI
        ).then(()=>console.log("Database Connected")).catch(err=>console.log("Error connecting the DB"))
}

module.exports = connectDB;