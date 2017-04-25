'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    runSequence = require('run-sequence');

var path = {
  build: {
    html: 'www/',
    js: 'www/js/',
    css: 'www/css/',
    img: 'www/img/',
    fonts: 'www/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.ttf'
  },
  watch: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.ttf'
  },
  clean: ['./www']
};

var config = {
  server: {
      baseDir: "www/",
      index: 'commissioning.html'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000
};

gulp.task('html-build', function () {
  gulp.src(path.src.html)
      .pipe(gulp.dest(path.build.html))
      .pipe(reload({stream: true}));
});

gulp.task('js-build', function () {
  gulp.src(path.src.js)
      .pipe(rigger())
      .pipe(sourcemaps.init())
      .pipe(jshint())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.js))
      .pipe(reload({stream: true}));
});;

gulp.task('style-build', function () {
  gulp.src(path.src.style)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(prefixer())
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.build.css))
      .pipe(reload({stream: true}));
});

gulp.task('image-build', function () {
  return gulp.src(path.src.img)
              .pipe(cache(imagemin ([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({use: pngquant()})
              ])))
              .pipe(gulp.dest(path.build.img))
              .pipe(reload({stream: true}));
});

gulp.task('fonts-build', function () {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts))
      .pipe(reload({stream: true}));
});

gulp.task('build', function(cb) {
  runSequence('image-build', ['fonts-build', 'style-build', 'html-build'], 'js-build', cb);
});

gulp.task('watch', ['build'], function(){
  gulp.watch(path.watch.html, ['html-build']);
  gulp.watch(path.watch.js, ['js-build']);
  gulp.watch(path.watch.style, ['style-build']);
  gulp.watch(path.watch.img, ['image-build']);
  gulp.watch(path.watch.fonts, ['fonts-build']);
});

gulp.task('webserver', ['build'], function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  del(path.clean);
  cache.clearAll(cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
