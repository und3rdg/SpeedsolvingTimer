// GULP REQUIRE
var gulp = require("gulp"),
  gulp           = require("gulp"),
  watch          = require("gulp-watch"),
  plumber        = require("gulp-plumber"),
  sass           = require("gulp-sass"),
  cleanCSS       = require("gulp-clean-css"),
  autoPrefixer   = require("gulp-autoprefixer"),
  order          = require("gulp-order")
  concat         = require("gulp-concat"),
  uglify         = require("gulp-uglify"),
  sourcemaps     = require("gulp-sourcemaps"), 
  mocha          = require("gulp-mocha"),
  stripCode      = require("gulp-strip-code"),
  bsync          = require("browser-sync").create()

// FILE DESTINATIONS
var dist = {
  php: "dist",
  css: "dist/css",
  font: "dist/font",
  js: "dist/js",
  img: "dist/img"
}

var src = {
  php: "src/**/*.php",
  html: "src/**/*.html",
  css: "src/css/**/*.sass",
  font:"src/font/**/*.ttf",
  js: [
    "src/js/lib/jquery-3.2.1.js",
    "src/js/1-start.js",
    "src/js/2-timer.js",
    "src/js/3-statistic.js",
    "src/js/4-statistic.Table.js",
    "src/js/99-end.js"
  ],
  test: [
    // "test/2-timerTest.js",
    "test/3-statisticTest.js"
  ],
  img: "src/img/**/*"
}
// BROWSER SYNC
gulp.task('browser-sync', function() {
  bsync.init({
    // server: {
    //     basedir: "./"
    // },
    proxy: "localhost:80",
    open: false,
    browser: "chromium"
  })

})

// CSS
gulp.task('css', function() {
  return gulp.src(src.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass().on('error',sass.logError))
      .pipe(autoPrefixer())
      .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.css))
    .pipe(bsync.stream())
})

// JAVASCRIPT
gulp.task('js', function() {
  return gulp.src(src.js)
    .pipe(sourcemaps.init())
      .pipe(stripCode({
        // unfortunately does not support sourcemap, try use it at the end of file
        pattern: RegExp("([\\t ]*\\/\\/ ?" + "start-test" + " ?)[\\s\\S]*?(\\/\\/ ?" + "end-test" + " ?[\\t ]*\\n?)", "g")
      }))
    .pipe(plumber())
      // .pipe(uglify())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.js))
})

// MOCHA TEST
gulp.task('testMocha', function(){
  return gulp.src(src.test)
    .pipe(mocha())
})

// PHP
gulp.task('php', function() {
  return gulp.src(src.php)
    .pipe(gulp.dest(dist.php))
})

// IMG
gulp.task('img', function() {
  return gulp.src(src.img)
    .pipe(gulp.dest(dist.img))
})

// FONT
gulp.task('font', function() {
  return gulp.src(src.font)
    .pipe(gulp.dest(dist.font))
})

// WATCH
gulp.task('watch', ['browser-sync', 'testMocha'], function() {
  gulp.watch(src.css, ['css'])
  gulp.watch(src.test, ['js', 'testMocha'])
  gulp.watch(src.js, ['js', 'testMocha'])
  gulp.watch(src.js).on('change', bsync.reload)
  gulp.watch(src.php, ['php'])
  gulp.watch(src.php).on('change', bsync.reload)
  gulp.watch(src.img, ['img'])
  gulp.watch(src.font, ['font'])
})
// DEFAULT
gulp.task('default', ['watch', 'css', 'js', 'img', 'php', 'font'])

