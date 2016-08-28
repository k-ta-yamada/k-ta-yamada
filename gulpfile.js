// **********************************************************************
// define
// **********************************************************************
var _ = require('lodash');
var del = require('del');

var gulp = require('gulp');

var mainBowerFiles = require('main-bower-files');
var logger  = require('gulp-logger');
var concat  = require('gulp-concat');
var filter  = require('gulp-filter');
var rename  = require('gulp-rename');
var flatten = require('gulp-flatten');

var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var cssmin = require('gulp-cssmin');
// var autoprefixer = require('gulp-autoprefixer');


// **********************************************************************
// bower
// **********************************************************************
gulp.task('bower:js', function() {
  return gulp
    // .src(mainBowerFiles({ filter: '**/*.js' }))
    // .pipe(uglify())

    // .src('bower_components/**/*.min.js')
    .src(mainBowerFiles({
      filter: '**/*.js',
      "overrides": {
        "angular":             { "main": "./angular.min.js" },
        "angular-animate":     { "main": "./angular-animate.min.js" },
        "angular-loading-bar": { "main": "build/loading-bar.min.js" },
        "bootstrap-sass":      { "main": "assets/javascripts/bootstrap.min.js" },
        "c3":                  { "main": "c3.min.js" },
        "d3":                  { "main": "d3.min.js" },
        "jquery":              { "main": "dist/jquery.min.js" }
      }
    }))
    .pipe(rename({ extname: '' }))
    .pipe(rename({ extname: '' }))
    .pipe(rename({ extname: '.js' }))
    .pipe(flatten())

    // .pipe(concat('_script.js'))
    // .pipe(gulp.dest('sources/js/'))
    .pipe(gulp.dest('public/js/'))
    .pipe(logger({ beforeEach: '[bower:js] ' }));
});

gulp.task('bower:css', function() {
  return gulp
    .src(mainBowerFiles({ filter: '**/*.css' }))
    .pipe(cssmin())
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
    .pipe(cssmin())
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
    .pipe(cssmin())
    .pipe(gulp.dest('public/css/'))
    .pipe(logger({ beforeEach: '[orig:css] ' }));
});

gulp.task('orig:js', function() {
  return gulp
    .src('sources/js/*')
    // .pipe(uglify())
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
  var watcher = gulp.watch('sources/**/*', ['orig']);
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
