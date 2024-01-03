const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    },
    lastmail : {
        type : Date,
        default : null,
    },
    totalmail : {
        type : Number,
        default : 0
    },
    reportId : {
        type : mongoose.Types.ObjectId
    }
})


const reportSchema = new mongoose.Schema({
    score : {
        type : Number,
        required : true
    },
    keywords : [{
        type : String
    }],
    analysis : {
        type : String,
    },
    timestamp : {
        type : Date,
        default : Date.now()
    }
})
const User = new mongoose.model('User',userSchema)
const Report =  new mongoose.model('Report',reportSchema)

module.exports = {User,Report}