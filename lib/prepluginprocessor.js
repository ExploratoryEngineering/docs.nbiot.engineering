const remark = require("remark");
const strip = require("strip-markdown");
const textVersion = require("textversionjs");
const path = require("path");
const config = require("../config/config");
const configDocs = require("../config/config-docs");

module.exports = () => {
    return (files, metalsmith, done) => {
        addPlaintext(files);
        addEditUrlIfExists(files);
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
    return /\.(json|yml|yaml|openapi)$/.test(path.extname(file));
}

function addPlaintext(files) {
    Object.keys(files).filter(isHtml).forEach((file) => {
        const styleConfig = {
            linkProcess: (href, linkText) => {
                return linkText;
            },
            imgProcess: (src, alt) => {
                return alt;
            }
        };

        files[file].plaintext = textVersion(files[file].contents.toString(), styleConfig);
    });

    Object.keys(files).filter(isMarkdown).forEach((file) => {
        remark()
            .use(strip)
            .process(files[file].contents.toString(), (err, plaintext) => {
                if (err) throw err;
                files[file].plaintext = String(plaintext);
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
