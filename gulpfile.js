const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const minifyHTML = require('gulp-htmlmin');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');
const autoPrefixer = require('gulp-autoprefixer');


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"// base klasöürümüz dist klasörüdür.
        }
    });
});

gulp.task('css',()=>{
    return gulp.src('src/sass/**/*.scss')// bütün klasörün içindeki scss dosyalarını çalıştır.
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(autoPrefixer())
    .pipe(concat('app.min.css')) //dosyaları  birleştirip app.min.css adını ver.
    .pipe(gulp.dest('dist/css'))// git bunu dist ' in içindeki css dosyasının içine at.
    .pipe(browserSync.stream());
    
})

gulp.task('js',()=>{
    return gulp.src('src/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
})

gulp.task('html',()=>{
    return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
})

gulp.task("img",()=>{
    return gulp.src('src/img/**/*')
    .pipe(minifyImg())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());

})
// tek tek tasklarımızı tanımladık. Ama önemli olan bunu otomotize etmektir.

gulp.task('delete',()=>{
    del(['dist/css','dist/js','dist/img','dist/**/*.html'])
});
gulp.task('watch',()=>{
    gulp.watch('src/**/*.html',gulp.series('html'));
    gulp.watch('src/img/**/*',gulp.series('img'));
    gulp.watch('src/js/**/*.js',gulp.series('js'));
    gulp.watch('src/scss/**/*.scss',gulp.series('css'));
})



gulp.task('default', () => {
    runSequence(
        'delete',
        'html',
        'css',
        'js',
        'img',
        'browser-sync',
        'watch'
    );
});