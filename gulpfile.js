var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync").create();
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");

gulp.task("less", () => {
    return gulp.src("less/style.less")
        .pipe(less())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("minify-css", ["less"], () => {
    return gulp.src("css/style.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("copy", () => {
    gulp.src(["node_modules/bootstrap/dist/**/*", "!**/npm.js", "!**/bootstrap-theme.*", "!**/*.map"]).pipe(gulp.dest("vendor/bootstrap"));
    gulp.src(["node_modules/jquery/dist/jquery.js", "node_modules/jquery/dist/jquery.min.js"]).pipe(gulp.dest("vendor/jquery"));
});

gulp.task("default", ["less", "minify-css", "copy"]);

gulp.task("browserSync", () => {
    browserSync.init({ server: { baseDir: "" } });
});

gulp.task("dev", ["browserSync", "less", "minify-css"], () => {
    gulp.watch("less/*.less", ["less"]);
    gulp.watch("css/*.css", ["minify-css"]);

    gulp.watch("*.html", browserSync.reload);
});
