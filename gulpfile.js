var browserify = require('gulp-browserify'),
    gulp = require('gulp'),
    minifier = require('gulp-minifier'),
    rename = require('gulp-rename');


gulp.task('dist/angular-nadobit-adminlte.js', function() {
    return gulp.src('src/angular-nadobit-adminlte.js')
        .pipe(browserify({debug: true}))
        .pipe(gulp.dest('dist'));
});


gulp.task('dist/angular-nadobit-adminlte.min.js', gulp.series(
    'dist/angular-nadobit-adminlte.js',
    function() {
        return gulp.src('dist/angular-nadobit-adminlte.js')
            .pipe(minifier({
                minify: true,
                minifyJS: true,
                collapseWhitespace: true,
            }))
            .pipe(rename('angular-nadobit-adminlte.min.js'))
            .pipe(gulp.dest('dist'));
    }
));
