const config = require("../config/config");
const configDocs = require("../config/config-docs");

const path = require("path");
const metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const blc = require("metalsmith-broken-link-checker");
const prepluginprocessor = require("../lib/prepluginprocessor");
const postpluginprocessor = require("../lib/postpluginprocessor");
const isMarkdown = require("../lib/utils").isMarkdown;

const report = require("vfile-reporter");
const remark = require("remark");
const styleGuide = require("remark-preset-lint-recommended");

const expect = require("chai").expect;

let files;

describe("documentation", () => {
    before((done) => {
        metalsmith(path.dirname(__dirname))
            .source(configDocs.sourceDir)
            .process((err, f) => {
                if (err) throw err;
                files = f;
                done();
            });
    });

    describe("docs", () => {
        it("should not have pages without a title", () => {
            Object.keys(files).filter((file) => {
                return /\.(htm|html|md|markdown|json|yml|yaml|openapi)$/.test(path.extname(file));
            }).forEach((file) => {
                expect(files[file].title).to.not.be.undefined;
            });
        });

        it("should not have broken internal links", (done) => {
            metalsmith(path.dirname(__dirname))
                .clean(false)
                .source(configDocs.sourceDir)
                .metadata({
                    docName: config.docName,
                    hostname: config.hostname,
                    webRoot: config.webRoot,
                    enableOpenApi: config.enableOpenApi
                })
                .use(prepluginprocessor({
                    editUrl: config.editUrl,
                    docsSourceDir: configDocs.sourceDir,
                    thumbnail: config.thumbnail
                }))
                .use(markdown({
                    smartypants: true,
                    gfm: true,
                    tables: true
                }))
                .use(postpluginprocessor())
                .use(blc({
                    baseURL: config.webRoot
                }))
                .process((err, f) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe("markdown", () => {
        it("should conform to the style guide", (done) => {
            let passed = true;
            Object.keys(files).filter(isMarkdown).forEach((file) => {
                const lint = remark().use(styleGuide).processSync(files[file].contents.toString());
                if (lint.messages.length > 0) {
                    // eslint-disable-next-line no-console
                    console.log("     ", file + ":");
                    // eslint-disable-next-line no-console
                    console.log("     ", report(lint).replace(/\n\r?/g, "\n      "));
                }
                for (i in lint.messages) {
                    if (lint.messages[i].fatal) {
                        passed = false;
                    }
                }
            });

            if (passed) {
                done();
            } else {
                done(new Error("Markdown linting failed"));
            }
        });
    });
});
