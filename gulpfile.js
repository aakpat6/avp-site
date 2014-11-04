var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var argv = require('yargs').argv;
var merge = require('merge-stream');
var connect = require('gulp-connect');

gulp.task('scripts', function() {
  return gulp.src(['js/affix.js', 'js/tooltip.js', 'js/index.js'])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function() {
  var font = gulp.src('font/**')
    .pipe(gulp.dest('dist/font'));

  var img = gulp.src('img/**')
    .pipe(gulp.dest('dist/img'));

  var favicon = gulp.src('img/favicon.ico')
    .pipe(gulp.dest('dist/'));

  var merged = merge(font, img);
  merged.add(favicon);

  return merged;
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('connect', function() {
  if (!argv.prod) {
    gutil.log('Listening on', port);
    connect.server({
      port: port,
      root: 'dist'
    });
  }
});

gulp.task('default', ['scripts', 'styles', 'copy', 'html', 'connect'], function() {
  if (!argv.prod) {
    gulp.watch('js/**', ['scripts']);
    gulp.watch('less/**', ['styles']);
    gulp.watch('index.html', ['html']);
  }
});
