const path = require("path");
const config = require("../config/config");
const configDocs = require("../config/config-docs");

module.exports = () => {
    return (files, metalsmith, done) => {
        addEditUrlIfExists(files);
        done();
    };
};

function addEditUrlIfExists(files, metalsmith) {
    if (config.editUrl && config.editUrl.length > 0) {
        Object.keys(files).forEach((file) => {
            files[file].editUrl = config.editUrl + path.join(configDocs.sourceDir, file);
        });
    }
}
