const { src, dest, parallel, watch, series } = require('gulp'), concat = require('gulp-concat'), 
sass = require('gulp-sass')(require('sass')), pug = require('gulp-pug'), browserSync = 
require('browser-sync').create()
const FilesPath = { sassFiles: 'sass/*.scss', htmlFiles: 'pages/*.pug' }
const {sassFiles, htmlFiles} = FilesPath
// task 1: sass -> css
function sassTask() { return src(sassFiles) .pipe(sass()) .pipe(concat('style.css')) 
.pipe(dest('dist/css')) .pipe(browserSync.stream()); }

// task 2: pug -> html
function htmlTask() { return src(htmlFiles) .pipe(pug({ pretty: true })) 
.pipe(dest('./')) .pipe(browserSync.stream()); } 

// task 3: assets -> disk
function assetsTask() { return src('assets/**/*') .pipe(dest('dist/assets')) }

// task 4: tạo server với live reload
function serve() { browserSync.init({ server: { baseDir: './' } }); watch('sass/**/*', 
    sassTask); watch('pages/**/*', htmlTask); }

// Gọi gulp bằng 1 dòng lệnh
exports.sass = sassTask; 
exports.html = htmlTask; 
exports.assets = assetsTask; 
exports.default = series(parallel(htmlTask, sassTask, assetsTask)); 
exports.serve = series(serve, parallel(htmlTask, sassTask, assetsTask))