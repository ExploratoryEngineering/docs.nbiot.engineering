const expect = require("chai").expect;
const rewire = require("rewire");

const prepluginprocessor = rewire("./prepluginprocessor");
const path = require("path");
const url = require("url");
const metalsmith = require("metalsmith");

const options = {
    editUrl: "https://somedomain.com/some-base-path/",
    docsSourceDir: "fixtures",
    thumbnail: "img/og_image.jpg"
};

let files;

describe("prepluginprocessor", () => {
    describe("module", () => {
        it("should export a metalsmith plugin", () => {
            expect(prepluginprocessor).to.be.a("function");
            expect(prepluginprocessor(options)).to.be.a("function");
        });
    });

    describe("helper functions", () => {
        it("should detect html files", () => {
            const isHtml = prepluginprocessor.__get__("isHtml");
            expect(isHtml("test.html")).to.be.true;
            expect(isHtml("file.htm")).to.be.true;
            expect(isHtml("html.test")).to.be.false;
            expect(isHtml("test.html.test")).to.be.false;
        });

        it("should detect markdown files", () => {
            const isMarkdown = prepluginprocessor.__get__("isMarkdown");
            expect(isMarkdown("test.markdown")).to.be.true;
            expect(isMarkdown("file.md")).to.be.true;
            expect(isMarkdown("markdown.test")).to.be.false;
            expect(isMarkdown("md.markdown.test")).to.be.false;
        });

        it("should detect openapi files", () => {
            const isOpenapi = prepluginprocessor.__get__("isOpenapi");
            expect(isOpenapi("test.json")).to.be.true;
            expect(isOpenapi("test.yaml")).to.be.true;
            expect(isOpenapi("test.openapi")).to.be.true;
            expect(isOpenapi("file.yml")).to.be.true;
            expect(isOpenapi("markdown.test.yaml.openapi.md")).to.be.false;
            expect(isOpenapi("md.markdown.test.yml.doc")).to.be.false;
        });
    });

    describe("metalsmith plugin", () => {
        before((done) => {
            metalsmith(path.dirname(__dirname))
                .source("test/fixtures")
                .metadata({
                    docName: "DocName",
                    hostname: "http://some.domain",
                    webRoot: "/web-root/",
                    enableOpenApi: true
                })
                .use(prepluginprocessor(options))
                .process((err, f) => {
                    if (err) throw err;
                    files = f;
                    done();
                });
        });

        it("should generate plaintext", () => {
            for (const file in files) {
                expect(files[file].plaintext.trim()).to.equal(files[file].plaintext_expected.trim());
            }
        });

        it("should add edit urls if configured", () => {
            for (const file in files) {
                expect(files[file].editUrl).to.equal(url.resolve(options.editUrl, path.join(options.docsSourceDir, file)));
            }
        });

        it("should not add edit urls if not configured", () => {
            metalsmith(path.dirname(__dirname))
                .source("test/fixtures")
                .use(prepluginprocessor({ editUrl: "" }))
                .process((err, f) => {
                    if (err) throw err;
                    for (const file in f) {
                        expect(f[file].editUrl).to.be.undefined;
                    }
                });
        });
    });
});
