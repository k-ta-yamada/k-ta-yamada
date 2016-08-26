// **********************************************************************
// define
// **********************************************************************
var _ = require('lodash');
var del = require('del');

var gulp = require('gulp');

var mainBowerFiles = require('main-bower-files');
var logger = require('gulp-logger');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');

// **********************************************************************
// bower
// **********************************************************************
gulp.task('bower:js', function() {
  jsFilter = filter('**/*.js');
  return gulp
    .src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(uglify())
    // .pipe(concat('_script.js'))
    // .pipe(gulp.dest('sources/js/'))
    .pipe(gulp.dest('public/js/'))
    .pipe(logger({ beforeEach: '[bower:js] ' }));
});

gulp.task('bower:css', function() {
  // styleFilter = filter(['**/*.scss', '**/*.css']);
  styleFilter = filter(['**/*.css']);
  return gulp
    .src(mainBowerFiles())
    .pipe(styleFilter)
    .pipe(sass())
    // .pipe(concat('_style.css'))
    // .pipe(gulp.dest('sources/css/'))
    .pipe(gulp.dest('public/css/'))
    .pipe(logger({ beforeEach: '[bower:css] ' }));
});

// ref: bower経由でインストールしたbootstrap-sassをgulpでコンパイルする - Qiita
//      http://qiita.com/kmszk/items/4d5db574585e06f60ca6
gulp.task('bower:bootstrap', function() {
  gulp.start('bower:bootstrap:fonts');
  return gulp
    .src('sources/css/bootstrap.scss')
    .pipe(sass({includePaths: ["bower_components/bootstrap-sass/assets/stylesheets/"] })
      .on('error', sass.logError))
    .pipe(gulp.dest('public/css/'))
    .pipe(logger({ beforeEach: '[bower:bootstrap] ' }));
});

gulp.task('bower:bootstrap:fonts', function() {
  return gulp
    .src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
    .pipe(gulp.dest('public/fonts/bootstrap/'))
    .pipe(logger({ beforeEach: '[bower:bootstrap:fonts] ' }));
});

gulp.task('bower', ['bower:js', 'bower:css', 'bower:bootstrap']);

// **********************************************************************
// orig
// **********************************************************************
gulp.task('orig:css', function() {
  return gulp
    .src('sources/css/*.css')
    .pipe(gulp.dest('public/css/'))
    .pipe(logger({ beforeEach: '[orig:css] ' }));
});

gulp.task('orig:js', function() {
  return gulp
    .src('sources/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(logger({ beforeEach: '[orig:js] ' }));
});

gulp.task('orig', ['orig:js', 'orig:css']);

// **********************************************************************
// others
// **********************************************************************
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;
  return gulp
    .src('views/layout.slim')
    .pipe(wiredep())
    .pipe(gulp.dest('views/'))
    .pipe(logger({ beforeEach: '[wiredep] ' }));
});

// ref: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
gulp.task('watch', function() {
  var watcher = gulp.watch('sources/**/*', ['default']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

// TODO
gulp.task('clean', function() {
  del('public/css/*');
  del('public/fonts/bootstrap/*');
  del('public/js/*');
});

gulp.task('default', ['clean'], function() {
  gulp.start(['bower', 'orig']);
});
