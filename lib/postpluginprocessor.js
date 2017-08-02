const path = require("path");

module.exports = () => {
    return (files, metalsmith, done) => {
        // remove files that haven't been processed from navigation
        Object.keys(files).forEach((file) => {
            if (!(/\.html$/.test(path.extname(file)))) delete files[file].nav_groups;
        });
        done();
    };
};
