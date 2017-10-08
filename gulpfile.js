//{{{ gulp require
var gulp = require("gulp"),
       gulp         = require("gulp"),
       watch        = require("gulp-watch"),
       plumber      = require("gulp-plumber"),
       sass         = require("gulp-sass"),
       cleanCSS     = require("gulp-clean-css"),
       autoPrefixer = require("gulp-autoprefixer"),
       concat       = require("gulp-concat"),
       uglify       = require("gulp-uglify"),
       bsync        = require("browser-sync").create();
///}}}
//{{{ file destinations 

var dist = {
    php: "dist",
    css: "dist/css",
    js: "dist/js",
    img: "dist/img"
}

var src = {
    php: "src/**/*.php",
    html: "src/**/*.html",
    css: "src/css/**/*.sass",
    font:"src/css/**/*.ttf",
    js: "src/js/**/*.js",
    img: "src/img/**/*"
}
// }}}
//{{{ browser sync
gulp.task('browser-sync', function() {
    bsync.init({
        // server: {
        //     basedir: "./"
        // },
        proxy: "localhost:80"
    });

    // gulp.watch(src.css, ['css']);
    // gulp.watch(src.jss, ['js']);
    // gulp.watch(src.php).on('change', bsync.reload);
});
// }}}
// {{{ css
gulp.task('css', function() {
    return gulp.src(src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest(dist.css))
        .pipe(bsync.stream());
});
// }}}
//{{{ javascript
//}}}
// {{{ watch
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(src.css, ['bsync']);
    gulp.watch(src.jss, ['js']);
    gulp.watch(src.php).on('change', bsync.reload);
});
// }}}
