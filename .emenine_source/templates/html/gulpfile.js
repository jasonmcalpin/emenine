var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task("script", function () {
  return gulp.src("SourceCode/src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("SourceCode/assets/js"));
});

gulp.task('sass', function () {
  return gulp.src('./SourceCode/src/css/styles.scss')
    .pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./SourceCode/assets/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./SourceCode/src/**/*.scss', ['sass']);
});


gulp.task('images', function() {
    gulp.src('SourceCode/src/images/**/*')
        .pipe(gulp.dest('SourceCode/assets/images/'));
});

gulp.task('fonts', function() {
    gulp.src('SourceCode/src/fonts/**/*')
        .pipe(gulp.dest('SourceCode/assets/fonts/'));
});



gulp.task('dev', ['script', 'sass', 'images', 'fonts']);

gulp.task('default', ['sass:watch']);