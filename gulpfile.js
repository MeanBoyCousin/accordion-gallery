var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename');

gulp.task('lint', () => {
    return gulp.src('src/accordion-gallery.js')
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format());
});

gulp.task('uglify', () => {
    return gulp.src('src/accordion-gallery.js')
        .pipe(gulp.dest('test'))
        .pipe(replace(/^export[\s\S]*/m, "export {buildGallery};"))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('accordion-gallery-min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('lint', 'uglify'));