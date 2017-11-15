const config = require("./config/config");
const configDocs = require("./config/config-docs");
const configStyle = require("./config/config-style");

const gulp = require("gulp");
const connect = require("gulp-connect");
const babelify = require("babelify");
const browserify = require("browserify");
const uglify = require("gulp-uglify");
const streamify = require("gulp-streamify");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const source = require("vinyl-source-stream");
const uglifySaveLicense = require("uglify-save-license");

const path = require("path");
const rimraf = require("rimraf");
const exec = require("child_process").exec;

const buildFolder = config.targetDir;
const docsFolder = configDocs.sourceDir;
const styleFolder = configStyle.sourceFolder;
const scriptFolder = "script";
const libFolder = "lib";
const layoutFolder = "layouts";

const vendorJs = [
    path.resolve(__dirname, "node_modules", "barba.js", "dist", "barba.js"),
    path.resolve(__dirname, "node_modules", "lunr", "lunr.js")
];

const swaggerUi = [
    path.resolve(__dirname, "node_modules", "swagger-ui-dist", "swagger-ui-bundle.js"),
    path.resolve(__dirname, "node_modules", "swagger-ui-docs-preset", "dist", "swagger-ui-docs-preset.js"),
    path.resolve(__dirname, "node_modules", "swagger-ui-docs-preset", "dist", "swagger-ui-docs-preset.css")
];

function swallowError(error) {
    console.error(error.toString());
    this.emit("end");
}

gulp.task("docs", (cb) => {
    exec("npm run build:docs", function(err, stdout, stderr) {
        console.error(stderr);
        cb(err);
    });
});

gulp.task("docs:dev", (cb) => {
    exec("npm run build:docs:dev", function(err, stdout, stderr) {
        console.error(stderr);
        cb(err);
    });
});

gulp.task("docs:watch", () => {
    gulp.watch(
        [`${ docsFolder }/*.*`, `${ docsFolder }/**/*.*`],
        ["docs:dev", "connect:reload:docs"]
    ).on("error", swallowError);
});

gulp.task("sass", () => {
    return gulp.src(path.join(__dirname, configStyle.sourceFolder, configStyle.sourceFile))
        .pipe(rename(configStyle.targetFile))
        .pipe(sass({
            includePaths: configStyle.includePaths,
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(path.join(__dirname, config.targetDir, configStyle.targetFolder)));
});

gulp.task("sass:dev", () => {
    return gulp.src(path.join(__dirname, configStyle.sourceFolder, configStyle.sourceFile))
        .pipe(rename(configStyle.targetFile))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: configStyle.includePaths,
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.join(__dirname, config.targetDir, configStyle.targetFolder)));
});

gulp.task("sass:watch", () => {
    gulp.watch(
        [`${ styleFolder }/*.scss`, `${ styleFolder }/**/*.scss`],
        ["sass:dev", "connect:reload:sass"]
    ).on("error", swallowError);
});

gulp.task("script", (cb) => {
    browserify({
        entries: ["./script/script.js"]
    })
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .pipe(source("script.js"))
        .pipe(streamify(uglify()))
        .pipe(rename("script.js"))
        .pipe(gulp.dest("./build/script"))
        .on("end", cb);
});

gulp.task("script:dev", (cb) => {
    browserify({
        entries: ["./script/script.js"]
    })
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest("./build/script"))
        .on("end", cb);
});

gulp.task("script:watch", () => {
    gulp.watch(
        [`${ scriptFolder }/*.js`, `${ scriptFolder }/**/*.js`],
        ["script:dev", "connect:reload:script"]
    ).on("error", swallowError);
});

gulp.task("vendor", (cb) => {
    gulp.src(vendorJs)
        .pipe(concat("vendor.js"))
        .pipe(streamify(uglify({
            output: {
                comments: uglifySaveLicense
            }
        })))
        .pipe(gulp.dest("./build/script"))
        .on("end", cb);
});

gulp.task("vendor:dev", (cb) => {
    gulp.src(vendorJs)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./build/script"))
        .on("end", cb);
});

gulp.task("swaggerui", (cb) => {
    if (config.enableOpenApi) {
        gulp.src(swaggerUi)
            .pipe(gulp.dest("./build/script/swagger-ui"))
            .on("end", cb);
    } else {
        cb();
    }
});

gulp.task("connect", function() {
    connect.server({
        root: buildFolder,
        port: "8888",
        livereload: true
    });
});

gulp.task("connect:reload", ["script:dev", "sass:dev", "docs:dev"], function() {
    gulp.src([
        `${ buildFolder }/**/*.html`,
        `${ buildFolder }/**/*.css`,
        `${ buildFolder }/**/*.js`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:docs", ["docs:dev"], function() {
    gulp.src([
        `${ buildFolder }/**/*.html`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:sass", ["sass:dev"], function() {
    gulp.src([
        `${ buildFolder }/**/*.css`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:script", ["script:dev"], function() {
    gulp.src([
        `${ buildFolder }/**/*.js`
    ]).pipe(connect.reload());
});

gulp.task("lib:watch", () => {
    gulp.watch(
        [`${ libFolder }/*.js`, `${ libFolder }/**/*.js`],
        ["docs:dev", "sass:dev", "script:dev", "connect:reload"]
    ).on("error", swallowError);
});

gulp.task("layout:watch", () => {
    gulp.watch(
        [`${ layoutFolder }/*.hbs`, `${ layoutFolder }/**/*.hbs`],
        ["docs:dev", "connect:reload"]
    ).on("error", swallowError);
});

gulp.task("clean", (cb) => {
    rimraf(path.resolve(__dirname, buildFolder), cb);
});

gulp.task("build", ["docs", "sass", "script", "vendor", "swaggerui"]);
gulp.task("watch", ["docs:dev", "sass:dev", "script:dev", "vendor:dev", "swaggerui", "connect", "sass:watch", "docs:watch", "script:watch", "lib:watch", "layout:watch"]);
gulp.task("default", ["watch"]);
