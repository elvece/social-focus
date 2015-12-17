/**
 * Module Dependencies
 */

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var connect = require('gulp-connect');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

/**
 * Config
 */

var paths = {
  sass: [
    './styles/scss/*.scss',
  ],
  styles: [
    './styles/css/*.css',
  ],
  scripts: [
    './js/*.js',
  ]
};

/**
 * Gulp Tasks
 */

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('styles', function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['styles']);
});

gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('minify-css', function() {
  var opts = {comments:true, spare:true};
  gulp.src(paths.styles)
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minify-js', function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browserify', function() {
  var files = ['./js/d3.js', './js/main.js', './js/init.js'];
  var bundler = browserify(files);
  watchify(bundler);
  var rebundle = function(){
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/'));
  };
  bundler.on('update', rebundle);
  return rebundle();
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('reload-js', ['browserify'], function(){
  browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'reload-js']);
});

// *** default task *** //
gulp.task('default', ['browser-sync', 'watch', 'sass:watch', 'browserify', 'reload-js'], function(){});

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'minify-css', 'minify-js', 'connectDist']
  );
});
