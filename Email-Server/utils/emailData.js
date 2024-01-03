const cheerio = require('cheerio');

function makeEmailData(emailData,keywords){
    let keywordsList = ''
    for (let i = 0; i < keywords.length - 1; i++) {
        keywordsList = keywordsList.concat(keywords[i], ', ');
    }
    const email  = `<html>
    Hi ,
    We hope this email finds you well. We are writing to check in on your progress and offer additional support as you continue your journey towards improved mental health.

    We understand that you've been facing challenges related to ${keywordsList}and ${keywords[keywords.length-1]}. It's important to remember that you're not alone in these struggles, and there are resources and people who care about your well-being.

    We've compiled a few more articles and resources that might be helpful for you. These articles address the condition you mentioned and provide practical advice and support:

${emailData}

In addition to these articles, here are some additional steps you can consider:

* Reach out to a local mental health support group or organization. They can provide a safe space to connect with others who understand your struggles and offer peer support.
* Explore online resources and forums dedicated to suicide prevention and mental health. These platforms can provide valuable insights and support from a community of peers and professionals.
* Consider seeking professional help from a therapist or counselor who specializes in your specific concerns. They can help you develop coping mechanisms, address underlying issues, and work towards lasting improvement.

Remember, taking care of your mental health is an ongoing process, and progress may not always be linear. It's important to be patient with yourself and celebrate small victories along the way.

Please don't hesitate to reach out if you need additional support or have any questions. I'm here to listen and help in any way I can.

Take care
</html>
    `
    const $ = cheerio.load(email);

    const updatedEmailHTML = $.html();
    

    return updatedEmailHTML ;
}

module.exports= {makeEmailData}