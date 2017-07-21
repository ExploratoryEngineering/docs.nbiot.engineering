const sass = require("node-sass");
const fs = require("fs");

sass.render({
    file: "./style/style.scss",
    includePaths: [ require("node-normalize-scss").includePaths ],
    outputStyle: "compressed"
}, (err, result) => {
    if (err) {
        throw err;
    } else {
        if (!fs.existsSync("./build/style/")) {
            fs.mkdirSync("./build/style/");
        }
        fs.writeFile("./build/style/style.css", result.css, (error) => {
            if (error) throw error;
        });
    }
});
