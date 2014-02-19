var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

gulp.task('scripts', function() {
  gulp.src(['js/affix.js', 'js/tooltip.js', 'js/index.js'])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  gulp.src('less/style.less')
    .pipe(less())
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function() {
  gulp.src('font/**')
    .pipe(gulp.dest('dist/font'));

  gulp.src('img/**')
    .pipe(gulp.dest('dist/img'));

  gulp.src('img/favicon.ico')
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', function() {
  gulp.run('scripts', 'styles', 'copy', 'html');

  if (!gulp.env.prod) {
    gulp.watch('js/**', function() {
      gulp.run('scripts');
    });

    gulp.watch('less/**', function() {
      gulp.run('styles');
    });

    gulp.watch('index.html', function() {
      gulp.run('html');
    });

    var express = require('express');
    var path = require('path');

    var app = express();
    var port = 8000;

    app.use(express.query())
      .use(express.bodyParser())
      .use(express.static(path.resolve('./dist/')))
      .listen(port, function() {
        gutil.log('Listening on', port);
      });
  }
});
