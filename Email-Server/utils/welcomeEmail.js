const cheerio = require('cheerio');

function welcomeEmail(score, analysis,articles){
const email =  `
<html>
    Hi,
    Thank you for Analysing your Mental Health on <b>Mind Mate </b>.
    We hope you are doing better than before.
    Here is your Mental health report: 
        Score  : ${score} <br/>
        Analysis : ${analysis}
    Here Are Some Article we suggest you to go through,these are compiled Articles for you which can help you to improve your Mental health
    ${articles}
</html>
`
const $ = cheerio.load(email);

    const updatedEmailHTML = $.html();
    

    return updatedEmailHTML ;
}

module.exports = {welcomeEmail}