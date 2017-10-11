const remark = require("remark");
const html = require("remark-html");
const textVersion = require("textversionjs");
const url = require("url");
const path = require("path");
const config = require("../config/config");
const configDocs = require("../config/config-docs");

module.exports = () => {
    return (files, metalsmith, done) => {
        addPlaintext(files);
        addEditUrlIfExists(files);
        parseThumbnail(metalsmith.metadata().webRoot, files);
        done();
    };
};

function isHtml(file) {
    return /\.(htm|html)$/.test(path.extname(file));
}

function isMarkdown(file) {
    return /\.(md|markdown)$/.test(path.extname(file));
}

function isOpenapi(file) {
    return config.enableOpenApi && /\.(json|yml|yaml|openapi)$/.test(path.extname(file));
}

function addPlaintext(files) {
    const styleConfig = {
        headingStyle: "linebreak",
        listStyle: "linebreak",
        linkProcess: (href, linkText) => {
            return linkText;
        },
        imgProcess: (src, alt) => {
            return alt;
        }
    };

    Object.keys(files).filter(isHtml).forEach((file) => {
        files[file].plaintext = textVersion(files[file].contents.toString(), styleConfig);
    });

    Object.keys(files).filter(isMarkdown).forEach((file) => {
        remark()
            .use(html)
            .process(files[file].contents.toString(), (err, htmlString) => {
                if (err) throw err;
                files[file].plaintext = textVersion(htmlString, styleConfig);
            });
    });

    Object.keys(files).filter(isOpenapi).forEach((file) => {
        files[file].plaintext = "Api Reference";
    });

    Object.keys(files).forEach((file) => {
        if (!files[file].plaintext) {
            files[file].plaintext = files[file].title;
        }
    });
}

function addEditUrlIfExists(files) {
    if (config.editUrl && config.editUrl.length > 0) {
        Object.keys(files).forEach((file) => {
            files[file].editUrl = config.editUrl + path.join(configDocs.sourceDir, file);
        });
    }
}

function parseThumbnail(webRoot, files) {
    Object.keys(files).forEach((file) => {
        files[file].thumbnail = url.resolve(config.hostname + webRoot, files[file].thumbnail || config.thumbnail);
    });
}
