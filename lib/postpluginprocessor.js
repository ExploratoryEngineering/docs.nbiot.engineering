const path = require("path");
const config = require("../config/config");

module.exports = () => {
    return (files, metalsmith, done) => {
        addUrl(files);
        removeUnprocessedFilesFromNavigation(files);
        done();
    };
};

function addUrl(files) {
    Object.keys(files).forEach((file) => {
        files[file].url = config.webRoot + file;
    });
}

function removeUnprocessedFilesFromNavigation(files) {
    Object.keys(files).forEach((file) => {
        if (!(/\.html$/.test(path.extname(file)))) {
            delete files[file].nav_groups;
        }
    });
}
