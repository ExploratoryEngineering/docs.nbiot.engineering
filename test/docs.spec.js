const path = require("path");

const expect = require("chai").expect;
const metalsmith = require("metalsmith");

const configDocs = require("../config/config-docs");


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
    });
});
