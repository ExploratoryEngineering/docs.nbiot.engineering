const fs = require("fs");
const path = require("path");

const expect = require("chai").expect;
const config = require("../config/config");
const configDocs = require("../config/config-docs");
const configStyle = require("../config/config-style");

describe("configuration", () => {
    describe("config.js", () => {
        it("should have a docName of at least one character", () => {
            expect(config.docName).to.be.a("string");
            expect(config.docName).to.not.be.empty;
        });
        it("should have a webRoot starting and ending with a slash", () => {
            expect(config.webRoot.charAt(0)).to.equal("/");
            expect(config.webRoot.slice(-1)).to.equal("/");
        });
        it("should have a webrootDev starting and ending with a slash", () => {
            expect(config.webrootDev.charAt(0)).to.equal("/");
            expect(config.webrootDev.slice(-1)).to.equal("/");
        });
        it("should have a targetDir", () => {
            expect(config.targetDir).to.be.a("string");
            expect(config.targetDir).to.not.be.empty;
        });
        it("should have a hostname", () => {
            expect(config.hostname).to.be.a("string");
            expect(config.hostname).to.not.be.empty;
        });
        it("should have a thumbnail", () => {
            expect(config.thumbnail).to.be.a("string");
            expect(config.thumbnail).to.not.be.empty;
        });
        it("should have an editUrl", () => {
            expect(config.editUrl).to.be.a("string");
        });
        it("should have an enableOpenApi flag", () => {
            expect(config.enableOpenApi).to.be.a("boolean");
        });
    });

    describe("config-docs.js", () => {
        it("should have a sourceDir", () => {
            expect(configDocs.sourceDir).to.be.a("string");
            expect(configDocs.sourceDir).to.not.be.empty;
        });
    });

    describe("config-style.js", () => {
        it("should have a sourceFolder", () => {
            expect(configStyle.sourceFolder).to.be.a("string");
            expect(configStyle.sourceFolder).to.not.be.empty;
        });
        it("should have a sourceFile that exists", () => {
            expect(configStyle.sourceFile).to.be.a("string");
            expect(configStyle.sourceFile).to.not.be.empty;
            expect(fs.existsSync(path.join(configStyle.sourceFolder, configStyle.sourceFile))).to.be.true;
        });
        it("should have a targetFolder", () => {
            expect(configStyle.targetFolder).to.be.a("string");
            expect(configStyle.targetFolder).to.not.be.empty;
        });
        it("should have a targetFile", () => {
            expect(configStyle.targetFile).to.be.a("string");
            expect(configStyle.targetFile).to.not.be.empty;
        });
        it("should have an array of includePaths", () => {
            expect(configStyle.includePaths).to.be.an("array");
        });
    });
});
