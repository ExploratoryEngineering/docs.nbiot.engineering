const path = require("path");

module.exports = {
    sourceFile: "style/style.scss", // relative to the project root
    targetFile: "style/style.css", // relative to the target directory
    includePaths: [require("node-normalize-scss").includePaths, path.join(__dirname, "..", "node_modules", "telenor-component-library"), path.join(__dirname, "..", "node_modules", "swagger-ui-docs-preset", "dist")],
}
