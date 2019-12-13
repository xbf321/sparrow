
const { watch, series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const miniCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

const targetDir = 'assets/build/';

function clearTargetDir(cb) {
    src(targetDir, { allowEmpty: true })
        .pipe(clean());
    cb();
}

function streamTask(cb) {
    src('assets/scss/matters.scss')
        .pipe(sass())
        .pipe(miniCSS())
        .pipe(rename({ extname: '.min.css'}))
        .pipe(dest(targetDir));
    cb();
}

watch('assets/scss/*.scss', series(clearTargetDir, streamTask));
exports.default = series(clearTargetDir, streamTask);
