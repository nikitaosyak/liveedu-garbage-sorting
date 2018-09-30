
const gulp = require('gulp')
const fs = require('fs')
gulp.task('process-assets', () => {
    process.chdir('./assets')
    const graphicsDigest = []
    const sfxDigest = []

    const iterateFolder = path => {
        fs.readdirSync(path).forEach(fsEntry => {
            if (fs.lstatSync(`${path}/${fsEntry}`).isDirectory()) {
                iterateFolder(`${path}/${fsEntry}`)
            } else {
                const relativePath = `${path}/${fsEntry}`.replace(process.cwd(), '').slice(1)

                if (relativePath.indexOf('sfx') > -1) {
                    sfxDigest.push({
                        alias: relativePath.replace(/\//g, '_').replace(/\.mp3$/, ''),
                        path: `assets/${relativePath}`
                    })
                } else
                if (relativePath.indexOf('graphics') > -1) {
                    graphicsDigest.push({
                        alias: relativePath
                            .replace(/\//g, '_')
                            .replace(/graphics_/, '')
                            .replace(/\.png$/, ''),
                        path: `assets/${relativePath}`
                    })
                }
            }
        })
    }
    iterateFolder(process.cwd())
    process.chdir('..')

    fs.writeFileSync('assets/digest.json', JSON.stringify(
        { graphics: graphicsDigest, sfx: sfxDigest }, null, 2))
})