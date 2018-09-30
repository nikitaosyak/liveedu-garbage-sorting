
const gulp = require('gulp')

gulp.task('prepare-pixi-library', () => {
    return gulp.src([
        'src/lib/pixi/pixi.lib.min.js',
        'src/lib/pixi/pixi-particles.lib.min.js',
        'src/lib/pixi/pixi-sound.js',
        'src/lib/pixi/pixi-viewport.js'
    ])
        .pipe(require('gulp-concat')('Pixi.js'))
        .pipe(gulp.dest('src/lib'))
})

gulp.task('prepare-libraries', ['prepare-pixi-library'], () => {
    return gulp.src('src/lib/*.js')
        .pipe(require('gulp-concat')('libraries.js'))
        .pipe(gulp.dest('src/'))
})