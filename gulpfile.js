console.log(`
##################
#   start gulp   #
##################
`)
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
  bsync          = require("browser-sync").create()

// FILE DESTINATIONS
var dist = {
  php: "dist",
  css: "dist/css/",
  font: "dist/font",
  js: "dist/js",
  img: "dist/img"
}

var src = {
  php: "src/**/*.php",
  html: "src/**/*.html",
  css: "src/css/main.sass",
  sass: "src/css/**/*",
  font:"src/font/**/*.ttf",
  js: [
    "src/js/lib/jquery-3.2.1.js",
    "src/js/1-start.js",
    "src/js/2-timer.js",
    "src/js/3-statistic.js",
    "src/js/4-statisticTable.js",
    "src/js/99-end.js"
  ],
  test: [
    // "test/2-timerTest.js",
    "test/3-statisticTest.js",
    "test/4-statisticTableTest.js"
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
    browser: "chromium",
    open: false
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
    .pipe(plumber())
      .pipe(uglify())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist.js))
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

// MOCHA TEST
gulp.task('testMocha', function(){
console.log(`
         ##################
         #   MOCHA TASK   #
         ##################
`)
  return gulp.src(src.test)
    .pipe(mocha())
})

// WATCH
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(src.sass, ['css'])
  gulp.watch(src.js, ['js', 'testMocha']).on('change', bsync.reload)
  gulp.watch(src.test, ['testMocha'])
  gulp.watch(src.php, ['php']).on('change', bsync.reload)
  gulp.watch(src.img, ['img'])
  gulp.watch(src.font, ['font'])
})
// DEFAULT
gulp.task('default', ['watch', 'css', 'js', 'testMocha', 'img', 'php', 'font'])

