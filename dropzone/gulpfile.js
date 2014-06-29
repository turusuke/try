var gulp;
gulp   = require('gulp');
coffee = require('gulp-coffee');
watch = require('gulp-watch');

gulp.task('watch', function () {
  gulp.src('./js/*.coffee')
  .pipe(watch(function(files) {
    return files.pipe(coffee({bare: true}))
      .pipe(gulp.dest('./js/'))
  }));
});

gulp.task('coffee', function() {
  return gulp.src('./js/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./js/'))
});

gulp.task('default',['watch']);
gulp.task('deploy',['coffee']);