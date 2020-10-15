var gulp = require('gulp'),
  fileinclude  = require('gulp-file-include'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;
  // minifycss = require('gulp-minify-css'),
  // notify = require('gulp-notify');

function dev() {
  gulp.task('fileinclude-index', function () {
    return gulp.src(['./*.html'])
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('fileinclude-src', function () {
    return gulp.src(['./src/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./dist/src'));
  });

  // sass编译
  gulp.task('sass2css', function(){
    return gulp.src('./sass/*.scss')
      // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'))
      .pipe(reload({stream: true})) // 浏览器自动刷新
  });

  // 图片压缩
  gulp.task('imagesmin', function() {
    return gulp.src('./images/*.{png,jpg,gif,ico}')
      .pipe(imagemin({optimizationLeve1: 5,progressive:true})) // 取值范围：0-7（优化等级）,是否无损压缩jpg图片，是否隔行扫描gif进行渲染
      .pipe(gulp.dest("./dist/images"))
      // .pipe(notify({message : "Images task complete"}));
  })

  //在命令行执行：gulp sass:watch，就可实现监听文件变化来自动编译
  gulp.task('dev', function() {
    browserSync.init({
      server: ".dist",
      open: true,
    });
    //监听 scss/pug/js 文件
    gulp.watch('./*.html', gulp.series('fileinclude-index'))
    gulp.watch('./src/*.html', gulp.series('fileinclude-src'))
    gulp.watch('./sass/*.scss', gulp.series('sass2css'));
    gulp.watch('./images/*.png',gulp.series('imagesmin'));
    gulp.watch('./src/*.html').on('change',reload);
    gulp.watch('./script/*.js').on('change',reload);
  })
  // gulp.task('dev', gulp.series('clean', gulp.parallel('fileinclude-src', 'html', 'sass2css', 'imagesmin', 'video')))
}

module.exports = dev