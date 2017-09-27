module.exports = () => {
    return (files, metalsmith, done) => {
        removeEmptyFiles(files);
        done();
    };
};

function removeEmptyFiles(files) {
    Object.keys(files).forEach((file) => {
        if (files[file].nav_category) {
            delete files[file];
        }
    });
}
