import gulp from 'gulp'
import pug from 'gulp-pug'
import through2 from 'through2'
import browserSync from 'browser-sync'

const bs = browserSync.create()


export function pugCompile() {
    return gulp.src(['app/pug/**/*.pug', '!app/pug/includes/**/*.pug'])
        .pipe(pug({pretty: true}))
        .pipe(through2.obj(function (file, _, cb) {
            if (file.isBuffer()) {
                let content = file.contents.toString('utf8')
                content = content.replace(/^\s*\n/, '') // Remove the first empty line
                file.contents = Buffer.from(content)
            }
            this.push(file)
            cb()
        }))
        .pipe(gulp.dest('app/html'))
        .pipe(bs.stream())
}

export function watchFiles() {
    bs.init({
        server: {
            baseDir: 'app/html',
        },
    })
    gulp.watch('app/pug/**/*.pug', pugCompile)
    gulp.watch('app/html/**/*.html').on('change', bs.reload) // Watch for changes in HTML files
}

export default gulp.series(pugCompile, watchFiles)
