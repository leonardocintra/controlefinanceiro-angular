const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')
const port = process.env.PORT || 3000

// para entender esses esquema, ver aula 62
// https://www.udemy.com/mean-primeira-aplicacao-do-zero/learn/v4/t/lecture/6192062
gulp.task('server', ['watch'], function() {
    gulp.src('public').pipe(webserver({
        livereload: true,
        port: port,
        open: true
    }))
})

gulp.task('watch', function() {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('assets.js'))
})