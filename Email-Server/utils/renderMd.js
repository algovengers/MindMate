const markdownit = require('markdown-it')

const md = markdownit();

function renderMarkdown(data){
    return md.render(data)
}

module.exports = { renderMarkdown}