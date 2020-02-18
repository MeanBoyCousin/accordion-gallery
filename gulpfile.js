var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename');

gulp.task('lint', () => {
    return gulp.src('dist/vertical-gallery.js')
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format());
});

gulp.task('uglify', () => {
    return gulp.src('dist/vertical-gallery.js')
        .pipe(uglify())
        .pipe(rename('vertical-gallery-min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('lint', 'uglify'));