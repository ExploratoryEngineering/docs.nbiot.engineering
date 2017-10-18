const path = require("path");

function isMarkdown(file) {
    return /\.(md|markdown)$/.test(path.extname(file));
}

function isHtml(file) {
    return /\.(htm|html)$/.test(path.extname(file));
}

module.exports = { isMarkdown, isHtml };
