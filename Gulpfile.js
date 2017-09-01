const gulp = require("gulp");
const connect = require("gulp-connect");

const exec = require("child_process").exec;

const buildFolder = "build";
const docsFolder = "docs";
const styleFolder = "style";

gulp.task("connect", function() {
    connect.server({
        root: buildFolder,
        port: "8888",
        livereload: true
    });
});

gulp.task("connect:reload", ["sass", "docs"], function() {
    gulp.src([
        `${ buildFolder }/**/*.html`,
        `${ buildFolder }/**/*.css`
    ]).pipe(connect.reload());
});

gulp.task("sass", (cb) => {
    exec("npm run build:style", function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});

gulp.task("sass:watch", () => {
    gulp.watch(
        [`${ styleFolder }/*.scss`, `${ styleFolder }/**/*.scss`],
        ["sass", "connect:reload"]
    );
});

gulp.task("docs", (cb) => {
    exec("npm run build:docs:dev", function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});

gulp.task("docs:watch", () => {
    gulp.watch(
        [`${ docsFolder }/*.md`, `${ docsFolder }/**/*.md`],
        ["docs", "connect:reload"]
    );
});

gulp.task("watch", ["docs", "sass", "connect", "sass:watch", "docs:watch"]);
gulp.task("default", ["watch"]);
