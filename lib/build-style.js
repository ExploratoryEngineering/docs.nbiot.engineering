const config = require("../config/config");
const configStyle = require("../config/config-style");

const sass = require("node-sass");
const fs = require("fs");
const path = require("path");
const mkdir = require("mkdir-recursive");

sass.render({
    file: path.join(__dirname, "..", configStyle.sourceFile),
    includePaths: configStyle.includePaths,
    outputStyle: "compressed"
}, (sassErr, result) => {
    if (sassErr) {
        throw sassErr;
    } else {
        const targetDir = path.dirname(path.join(__dirname, "..", config.targetDir, configStyle.targetFile));
        mkdir.mkdir(targetDir, function(mkdirErr) {
            if (mkdirErr) {
                throw mkdirErr;
            } else {
                fs.writeFile(path.join(__dirname, "..", config.targetDir, configStyle.targetFile), result.css, (fsErr) => {
                    if (fsErr) throw fsErr;
                });
            }
        });
    }
});
