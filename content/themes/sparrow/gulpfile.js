
const { watch, series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const miniCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const hash = require('gulp-hash');
const clean = require('gulp-clean');

const targetDir = 'build/';

function clearTargetDir(cb) {
    src(targetDir, { allowEmpty: true })
        .pipe(clean());
    cb();
}

function streamTask(cb) {
    src('css/style.scss')
        .pipe(sass())
        .pipe(miniCSS())
        .pipe(hash())
        .pipe(rename({ extname: '.min.css'}))
        .pipe(dest(targetDir));
    cb();
}

watch('css/*.scss', series(clearTargetDir, streamTask));
exports.default = series(clearTargetDir, streamTask);