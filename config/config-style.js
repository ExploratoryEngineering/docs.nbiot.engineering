const path = require("path");

module.exports = {
    sourceFolder: "style", // relative to the project root
    sourceFile: "style.scss",
    targetFolder: "style", // relative to the target build directory
    targetFile: "style.css",
    includePaths: [require("node-normalize-scss").includePaths,
        path.join(__dirname, "..", "node_modules", "@telenorfrontend/tn-components"),
        path.join(__dirname, "..", "node_modules/highlight.js/styles")
    ]
};
