//引入插件
var gulp = require('gulp')
var concat = require('gulp-concat')
var htmlmin = require('gulp-htmlmin')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var minifyCss = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload;

 
//压缩html
gulp.task('pages', function () {
    return gulp.src('pages/**/*.html',{base:'pages'})
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS:true,
            removeComments: true,
            removeSciptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('./dist/')) //生成到目标文件夹
        .pipe(reload({stream: true})) // 浏览器自动刷新
})

//压缩js文件
gulp.task('js', function () {
    return gulp.src('pages/**/*.js',{base:'pages'})
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}))
})

//压缩less文件
gulp.task('less', function () {
    return gulp.src('pages/**/*.less',{base:'pages'})
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}))
})

gulp.task('server', function(){
    browserSync.init({
        server: "./dist/tenword",//打开的目标 文件夹
        open: true,
        port:3000
    })
   
    gulp.watch('pages/**/*.html', gulp.series('pages'))
    gulp.watch('pages/**/*.js', gulp.series('js'))
    gulp.watch('pages/**/*.less', gulp.series('less'))
})

//注册一个默认的任务
gulp.task('default', gulp.series('pages', 'less', 'js', 'server'))
