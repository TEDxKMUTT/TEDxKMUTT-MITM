var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');

var sass_input = './src/sass/*.+(scss|sass)';
var bootstrap = './src/bootstrap-sass/assets/stylesheets/bootstrap.scss';
var all_boostrap = './src/bootstrap-sass/assets/stylesheets/**/**/*.+(scss|sass)';
var css_output = './public/assets/css/';
var view_dir = './views/*.+(ejs)';

var port = 5001;
var ip = '127.0.0.1';
var proxy = ip+":"+port;

var sass_options = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('watch', function(){

    browserSync.init({
        proxy: proxy
    });

    gulp.watch(sass_input, ['sass']);
    gulp.watch(bootstrap, ['bootstrap-sass']);
    gulp.watch(view_dir).on('change', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp
        .src(sass_input)
        .pipe(sass(sass_options).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(css_output))
        .pipe(browserSync.stream());
});

gulp.task('bootstrap-sass', function(){
    return gulp
        .src(bootstrap)
        .pipe(sass(sass_options).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(css_output))
        .pipe(browserSync.stream());
});