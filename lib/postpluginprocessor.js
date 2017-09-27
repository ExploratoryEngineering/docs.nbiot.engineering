const path = require("path");

module.exports = () => {
    return (files, metalsmith, done) => {
        addUrl(files, metalsmith.metadata().webRoot);
        removeUnprocessedFilesFromSearch(files);
        removeUnprocessedFilesFromNavigation(files);
        done();
    };
};

function addUrl(files, webRoot) {
    Object.keys(files).forEach((file) => {
        files[file].url = webRoot + file;
    });
}

function removeUnprocessedFilesFromSearch(files) {
    Object.keys(files).forEach((file) => {
        if (!(/\.html$/.test(path.extname(file)))) {
            delete files[file].lunr;
        }
    });
}

function removeUnprocessedFilesFromNavigation(files) {
    Object.keys(files).forEach((file) => {
        if (!(/\.html$/.test(path.extname(file)))) {
            delete files[file].nav_groups;
        }
    });
}
