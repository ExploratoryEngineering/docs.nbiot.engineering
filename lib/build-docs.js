const config = require("../config/config");
const configDocs = require("../config/config-docs");

const path = require("path");
const metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");

metalsmith(path.dirname(__dirname))
    .clean(false)
    .source(configDocs.sourceDir)
    .destination(config.targetDir)
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .build((err, files) => {
        if (err) throw err;
    });
