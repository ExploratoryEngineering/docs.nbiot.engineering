const url = require("url");
const path = require("path");
const cheerio = require("cheerio");
const isHtml = require("./utils").isHtml;

module.exports = () => {
    return (files, metalsmith, done) => {
        addUrl(files, metalsmith.metadata().webRoot);
        resolveLinks(files, metalsmith.metadata().webRoot);
        removeUnprocessedFilesFromSearch(files);
        removeUnprocessedFilesFromNavigation(files);
        done();
    };
};

function getProcessedPaths(files) {
    let paths = {};

    Object.keys(files).forEach((file) => {
        paths[files[file].srcPath] = file;
    });

    return paths;
}

function resolveLinks(files, webRoot) {
    const processedPaths = getProcessedPaths(files);
    const absoluteLink = new RegExp("^(?:[a-z]+:)?//", "i");

    Object.keys(files).filter(isHtml).forEach((file) => {
        const $ = cheerio.load(files[file].contents.toString());
        let changed = false;

        $("a").each((index, element) => {
            const $link = $(element);

            if ($link.is("a") && $link.attr("href") !== null && !absoluteLink.test($link.attr("href"))) {
                const href = $link.attr("href");
                const currDir = path.parse(files[file].srcPath).dir;
                let linkPath;

                if (href.charAt(0) === "/") {
                    linkPath = href.substr(1);
                } else {
                    linkPath = path.join(currDir, href);
                }

                if (linkPath in processedPaths) {
                    $link.attr("href", url.resolve(webRoot, processedPaths[linkPath]));
                    changed = true;
                } else if (linkPath.length === 0) {
                    $link.attr("href", webRoot);
                    changed = true;
                }
            }
        });

        if (changed && !(files[file].resolveLinks !== undefined && files[file].resolveLinks !== true)) {
            files[file].contents = new Buffer($.html().toString());
        }
    });
}

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
