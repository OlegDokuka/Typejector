var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    path = require('path');

var tsProject = ts.createProject('Typejector/tsconfig.json', {typescript: require('typescript')});

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('build', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest(''));
});

gulp.task('example', function () {
    var base = 'Example',
        folders = getFolders(base),
        tasks = folders.map(function (folder) {
            console.log(path.join(base, folder, '/*.ts'));

            return gulp.src(path.join(base, folder, '/*.ts'))
                .pipe(ts({
                    typescript: require('typescript'),
                    experimentalDecorators: true,
                    target: 'es5',
                    noImplicitAny: false
                }))
                .js.pipe(gulp.dest(path.join(base, folder)));
        });


});

gulp.task('clean', function () {
    return gulp.src([
        'Typejector/Core/**/*.js',
        'Typejector/Core/**/*.js.map',
        'Typejector/Core/**/*.d.ts',
        'Typejector/MEF/**/*.js',
        'Typejector/MEF/**/*.js.map',
        'Typejector/MEF/**/*.d.ts'
    ], {read: false})
        .pipe(clean({force: true}));
});