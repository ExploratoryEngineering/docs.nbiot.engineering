const config = require("../config/config");
const configStyle = require("../config/config-style");

const sass = require("node-sass");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

sass.render({
    file: path.join(__dirname, "..", configStyle.sourceFolder, configStyle.sourceFile),
    includePaths: configStyle.includePaths,
    outputStyle: "compressed"
}, (sassErr, result) => {
    if (sassErr) {
        throw sassErr;
    } else {
        const target = path.join(__dirname, "..", config.targetDir, configStyle.targetFolder, configStyle.targetFile);
        const targetDir = path.dirname(target);
        mkdirp(targetDir, function(mkdirErr) {
            if (mkdirErr) {
                throw mkdirErr;
            } else {
                fs.writeFile(target, result.css, (fsErr) => {
                    if (fsErr) throw fsErr;
                });
            }
        });
    }
});
