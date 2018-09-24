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
    path.resolve(__dirname, "node_modules", "@telenorfrontend", "swagger-ui-docs-preset", "dist", "swagger-ui-docs-preset.js"),
    path.resolve(__dirname, "node_modules", "@telenorfrontend", "swagger-ui-docs-preset", "dist", "swagger-ui-docs-preset.css")
];

function swallowError(error) {
    console.error(error.toString());
    this.emit("finish");
}

gulp.task("docs", function buildDocs(cb) {
    exec("npm run build:docs", function(err, stdout, stderr) {
        console.error(stderr);
        cb(err);
    });
});

gulp.task("docs:dev", function buildDocsDev(cb) {
    exec("npm run build:docs:dev", function(err, stdout, stderr) {
        console.error(stderr);
        cb(err);
    });
});

gulp.task("docs:watch", function docsWatch() {
    gulp.watch(
        [`${ docsFolder }/*.*`, `${ docsFolder }/**/*.*`],
        gulp.series("docs:dev", "connect:reload:docs")
    ).on("error", swallowError);
});

gulp.task("sass", function buildSass() {
    return gulp.src(path.join(__dirname, configStyle.sourceFolder, configStyle.sourceFile))
        .pipe(rename(configStyle.targetFile))
        .pipe(sass({
            includePaths: configStyle.includePaths,
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(path.join(__dirname, config.targetDir, configStyle.targetFolder)));
});

gulp.task("sass:dev", function buildSassDev() {
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

gulp.task("sass:watch", function buildSassWatch() {
    gulp.watch(
        [`${ styleFolder }/*.scss`, `${ styleFolder }/**/*.scss`],
        gulp.series("sass:dev", "connect:reload:sass")
    ).on("error", swallowError);
});

gulp.task("script", function buildScript() {
    return browserify({
        entries: ["./script/script.js"]
    })
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .pipe(source("script.js"))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest("./build/script"));
});

gulp.task("script:dev", function buildScriptDev() {
    return browserify({
        entries: ["./script/script.js"]
    })
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest("./build/script"));
});

gulp.task("script:watch", function buildScriptWatch() {
    gulp.watch(
        [`${ scriptFolder }/*.js`, `${ scriptFolder }/**/*.js`],
        gulp.series("script:dev", "connect:reload:script")
    ).on("error", swallowError);
});

gulp.task("vendor", function buildVendor() {
    return gulp.src(vendorJs)
        .pipe(concat("vendor.js"))
        .pipe(streamify(uglify({
            output: {
                comments: uglifySaveLicense
            }
        })))
        .pipe(gulp.dest("./build/script"));
});

gulp.task("vendor:dev", function buildVendorDev() {
    return gulp.src(vendorJs)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./build/script"));
});

gulp.task("swaggerui", function buildSwaggerUi(cb) {
    if (config.enableOpenApi) {
        gulp.src(swaggerUi)
            .pipe(gulp.dest("./build/script/swagger-ui"))
            .on("finish", cb);
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

gulp.task("connect:reload", gulp.parallel("script:dev", "sass:dev", "docs:dev"), function() {
    gulp.src([
        `${ buildFolder }/**/*.html`,
        `${ buildFolder }/**/*.css`,
        `${ buildFolder }/**/*.js`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:docs", gulp.series("docs:dev"), function() {
    gulp.src([
        `${ buildFolder }/**/*.html`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:sass", gulp.series("sass:dev"), function() {
    gulp.src([
        `${ buildFolder }/**/*.css`
    ]).pipe(connect.reload());
});

gulp.task("connect:reload:script", gulp.series("script:dev"), function() {
    return gulp.src([
        `${ buildFolder }/**/*.js`
    ]).pipe(connect.reload());
});

gulp.task("lib:watch", () => {
    return gulp.watch(
        [`${ libFolder }/*.js`, `${ libFolder }/**/*.js`],
        gulp.series("docs:dev", "sass:dev", "script:dev", "connect:reload")
    ).on("error", swallowError);
});

gulp.task("layout:watch", () => {
    return gulp.watch(
        [`${ layoutFolder }/*.hbs`, `${ layoutFolder }/**/*.hbs`],
        gulp.series("docs:dev", "connect:reload")
    ).on("error", swallowError);
});

gulp.task("clean", (cb) => {
    rimraf(path.resolve(__dirname, buildFolder), cb);
});

gulp.task("build", gulp.series("docs", "sass", "script", "vendor", "swaggerui"));
gulp.task("watch", gulp.series("docs:dev", "sass:dev", "script:dev", "vendor:dev", "swaggerui", gulp.parallel("connect", "sass:watch", "docs:watch", "script:watch", "lib:watch", "layout:watch")));
gulp.task("default", gulp.series("watch"));
