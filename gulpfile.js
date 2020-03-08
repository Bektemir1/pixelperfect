var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');

function css_style(done) {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())

    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    })

}

function watchSass() {
    gulp.watch("./**/*.scss", css_style)
    gulp.watch("*.html").on('change', browserSync.reload);
}
gulp.task('deploy', function () {
    return gulp.src("./perfectpixel/**/*")
        .pipe(ghPages())
});
gulp.task('default', gulp.parallel(sync, watchSass))