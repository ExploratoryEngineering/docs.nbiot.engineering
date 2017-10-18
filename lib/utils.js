const path = require("path");

function isHtml(file) {
    return /\.(htm|html)$/.test(path.extname(file));
}

module.exports = { isHtml };
