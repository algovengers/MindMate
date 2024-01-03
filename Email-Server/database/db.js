const {User, Report} = require('../Model/schema')

async function getUsersfromDB(){
    try {
        //Find Users whose lastmail date is 2 days back and totalmails<10 
        //Also since we are fetching data here we will also update their totalmails = totalmails+1 ans lastmail = Date.now()
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() -2)
        const data =  await User.find({totalmail : {$lt : 10}, lastmail : {$lte:twoDaysAgo}})
        //data is array of all the users whom we have to send data
        //update the document here



        for(let doc of data){
            const updateQuery = {
                $set : {
                    totalmail:  doc.totalmail + 1,
                    lastmail : new Date()

                }
            }
            await User.updateOne({ _id: doc._id }, updateQuery);
        }
        return data;
    } catch (error) {
        console.log(error.message)
    }
}


async function getReportfromDB(id){
    try {
        if(!id){
            return null
        }
        const data = await Report.find({userId : id})
        return data
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {getUsersfromDB,getReportfromDB}