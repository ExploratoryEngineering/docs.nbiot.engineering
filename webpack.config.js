const config = require("./config/config");
const path = require("path");

module.exports = {
    entry: "./script/script.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, config.targetDir, "script")
    }
};
