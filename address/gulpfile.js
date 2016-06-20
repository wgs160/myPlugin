/**
 * Created by 15031493 on 2015/5/27.
 */
var gulp = require('gulp');
var gt =  require('gulp-util');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

//模块名
var name = "address";

//js压缩
gulp.task('ug', function () {
        gulp.src(["src/js/"+name + ".js"])
            .pipe(uglify())
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest("dist/js/"));
});
