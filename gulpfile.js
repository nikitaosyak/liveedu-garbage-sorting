require('require-dir')('./tasks')

const env = require('dotenv').config().parsed

const gulp = require('gulp')
const connect = require('gulp-connect')
const fs = require('fs')

gulp.task('prepare-build', () => {
    if (fs.existsSync('build')) require('rimraf').sync('build')
    fs.mkdirSync('build')
})

gulp.task('webpack', ['prepare-build'], () => {
    const stream = require('webpack-stream')
    const webpack2 = require('webpack')

    const config = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {presets: ['env']}
                }
            ]
        },
        output: {filename: 'bundle.js'},
        devtool: 'source-map',
        mode: 'development'
    }

    return gulp.src('src/js/**/*')
        .pipe(stream(config, webpack2))
        .pipe(gulp.dest('build/'))
})

gulp.task('finish-deploy', ['webpack'], () => {
    fs.copyFileSync('src/index.html', 'build/index.html')
    fs.copyFileSync('src/libraries.js', 'build/libraries.js')

    return gulp.src(['assets/**/*']).pipe(gulp.dest('build/assets'))
})

//
// hot reload boilerplate
gulp.task('connect', () => {
    return connect.server({
        host: env.HOST,
        port: env.PORT,
        root: 'build',
        livereload: true
    })
})

gulp.task('reload', ['finish-deploy'], () => gulp.src('src/**/*').pipe(connect.reload()))
gulp.task('watch', () => gulp.watch(['src/index.html', 'src/js/**/*', 'assets/**/*'], ['reload']))
gulp.task('default', ['connect', 'finish-deploy', 'watch'])

