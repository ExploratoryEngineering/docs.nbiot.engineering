const path = require("path");
const metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");

metalsmith(path.dirname(__dirname))
    .clean(false)
    .source("docs")
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .build((err, files) => {
        if (err) throw err;
    });
