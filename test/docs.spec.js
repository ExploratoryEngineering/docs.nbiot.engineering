const config = require("../config/config");
const configDocs = require("../config/config-docs");

const path = require("path");
const metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const blc = require("metalsmith-broken-link-checker");
const prepluginprocessor = require("../lib/prepluginprocessor");
const postpluginprocessor = require("../lib/postpluginprocessor");


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
});
