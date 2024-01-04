const {Email} = require('../Email');
const { getArticles } = require('../Gemini/gemini');
const { getUsersfromDB,getReportfromDB } = require('../database/db');
const { makeEmailData } = require('../utils/emailData');
const { welcomeEmail } = require('../utils/welcomeEmail');

const email = new Email(process.env.SMTP_SERVICE,process.env.SMTP_EMAIL,process.env.SMTP_PASSWORD);

async function sendEmailToClients(req,res){
    try {
        const emailId =  req.body?.emailId
        const data = req.body?.data
        if(!emailId || !data){
            res.sendStatus(400)
            return;
        }
        const emailSent = await email.sendEmail(emailId,data)
        if(emailSent){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(500)
        }

    } catch (error) {
        res.sendStatus(500)
    }
}

async function sendWelcomeEmail(req,res){
    try {
        const emailId = req.body?.emailId
        const score = req.body.score
        const analysis =  req.body.analysis
        const keywords = req.body.keywords
        if(!emailId || !score || !analysis || !keywords){
            res.sendStatus(400)
            return;
        }

        const articles = await getArticles(keywords)

        
        const EmailToSend = welcomeEmail(score,analysis,articles)
        const emailSent = await email.sendEmail(emailId,EmailToSend)
        if(emailSent){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(500)
        }
    } catch (error) {
        res.sendStatus(500)
    }
}


async function sendScheduledEmails(req,res){
    try {
        //Pick data query
        const data = await getUsersfromDB();
        for(let doc in data){
            //get email 
            const userId = data[doc]._id
            const report = await getReportfromDB(userId)
            let emailData = ''
            if(report!==null)
             emailData = await getArticles(report[0].keywords)
            const EmailToSend = makeEmailData(emailData,report[0].keywords)
            
            const emailSent = await email.sendEmail(data[doc].email,EmailToSend)
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {sendEmailToClients,sendWelcomeEmail,sendScheduledEmails}