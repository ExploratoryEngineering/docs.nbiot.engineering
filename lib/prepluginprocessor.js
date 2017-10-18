const remark = require("remark");
const html = require("remark-html");
const textVersion = require("textversionjs");
const url = require("url");
const path = require("path");
const isHtml = require("./utils").isHtml;

let options;

module.exports = (opt) => {
    options = opt || {};

    return (files, metalsmith, done) => {
        const root = metalsmith.metadata().hostname + metalsmith.metadata().webRoot;
        addPlaintext(files, metalsmith.metadata().enableOpenApi);
        addEditUrlIfExists(files);
        addSrcPath(files);
        parseThumbnail(files, root, options.thumbnail);
        done();
    };
};

function isMarkdown(file) {
    return /\.(md|markdown)$/.test(path.extname(file));
}

function isOpenapi(file) {
    return /\.(json|yml|yaml|openapi)$/.test(path.extname(file));
}

function addSrcPath(files) {
    Object.keys(files).forEach((file) => {
        files[file].srcPath = file;
    });
}

function addPlaintext(files, enableOpenApi) {
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

    if (enableOpenApi) {
        Object.keys(files).filter(isOpenapi).forEach((file) => {
            files[file].plaintext = "Api Reference";
        });
    }

    Object.keys(files).forEach((file) => {
        if (!files[file].plaintext) {
            files[file].plaintext = files[file].title;
        }
    });
}

function addEditUrlIfExists(files) {
    if (options.editUrl && options.editUrl.length > 0) {
        Object.keys(files).forEach((file) => {
            files[file].editUrl = options.editUrl + path.join(options.docsSourceDir, file);
        });
    }
}

function parseThumbnail(files, root, thumbnail) {
    Object.keys(files).forEach((file) => {
        files[file].thumbnail = url.resolve(root, files[file].thumbnail || thumbnail);
    });
}
