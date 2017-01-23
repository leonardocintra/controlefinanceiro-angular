const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')

gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets'])


// sempre que app.html for chamado...
gulp.task('app.html', function() {
    gulp.src('app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('public'))
})

gulp.task('app.css', function() {

})

gulp.task('app.js', function() {
    
})

// assets = imagens, etc
gulp.task('app.assets', function() {
    
})