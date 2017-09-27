const path = require("path");

module.exports = {
    sourceFolder: "style", // relative to the project root
    sourceFile: "style.scss",
    targetFolder: "style", // relative to the target build directory
    targetFile: "style.css",
    includePaths: [require("node-normalize-scss").includePaths,
        path.join(__dirname, "..", "node_modules", "telenor-component-library"),
        path.join(__dirname, "..", "node_modules", "swagger-ui-docs-preset", "dist"),
        path.join(__dirname, "..", "node_modules/highlight.js/styles")
    ]
};
