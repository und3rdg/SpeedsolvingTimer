//{{{ GULP REQUIRE
var gulp = require("gulp"),
       gulp         = require("gulp"),
       watch        = require("gulp-watch"),
       plumber      = require("gulp-plumber"),
       sass         = require("gulp-sass"),
       cleanCSS     = require("gulp-clean-css"),
       autoPrefixer = require("gulp-autoprefixer"),
       concat       = require("gulp-concat"),
       uglify       = require("gulp-uglify"),
       sourcemaps    = require("gulp-sourcemaps"), 
       bsync        = require("browser-sync").create();
///}}}
//{{{ FILE DESTINATIONS 

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
    js: "src/js/**/*.js",
    img: "src/img/**/*"
}
// }}}
//{{{ BROWSER SYNC
gulp.task('browser-sync', function() {
    bsync.init({
        // server: {
        //     basedir: "./"
        // },
        proxy: "localhost:80",
        browser: "firefox-developer"
    });

});
// }}}
// {{{ CSS
gulp.task('css', function() {
    return gulp.src(src.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(sass().on('error',sass.logError))
            .pipe(autoPrefixer())
            .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.css))
        .pipe(bsync.stream());
});
// }}}
//{{{ JAVASCRIPT
gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.js))
});
//}}}
//{{{ PHP
gulp.task('php', function() {
    return gulp.src(src.php)
        .pipe(gulp.dest(dist.php))
});
//}}}
//{{{ IMG
gulp.task('img', function() {
    return gulp.src(src.img)
        .pipe(gulp.dest(dist.img))
});
//}}}
//{{{ FONT
gulp.task('font', function() {
    return gulp.src(src.font)
        .pipe(gulp.dest(dist.font))
});
//}}}
// {{{ WATCH
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(src.css, ['css']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.js).on('change', bsync.reload);
    gulp.watch(src.php, ['php']);
    gulp.watch(src.php).on('change', bsync.reload);
    gulp.watch(src.img, ['img']);
    gulp.watch(src.font, ['font']);
    // gulp.watch(src.php).on('change', bsync.reload);
});
// }}}
// {{{ DEFAULT
gulp.task('default', ['watch', 'css', 'js', 'img', 'php', 'font']);
// }}}
