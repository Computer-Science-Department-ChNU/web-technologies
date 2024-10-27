import gulp from 'gulp'
import browserSync from 'browser-sync'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import gulpPug from 'gulp-pug'
import plumber from 'gulp-plumber'

const sass = gulpSass(dartSass)

const paths = {
    scss: 'src/scss/**/*.scss',
    pug: 'src/pug/**/*.pug',
    pugIncludes: '!src/pug/includes/**/*.pug',
    dist: 'dist/',
}

export function pugTask() {
    return gulp.src([paths.pug, paths.pugIncludes])
        .pipe(plumber())
        .pipe(gulpPug({pretty: true}))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream())
}

export function scssTask() {
    return gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass(undefined, undefined).on('error', sass.logError))
        .pipe(gulp.dest(`${paths.dist}/css`))
        .pipe(browserSync.stream())
}

export function serveTask() {
    browserSync.init({
        server: {
            baseDir: paths.dist,
        },
        open: false,
    })

    gulp.watch(paths.scss, scssTask)
    gulp.watch(paths.pug, pugTask)
    gulp.watch(paths.dist).on('change', browserSync.reload)
}

export default gulp.series(scssTask, pugTask, serveTask)
