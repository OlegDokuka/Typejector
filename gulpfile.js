var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    clean = require('gulp-clean');

var tsProject = ts.createProject('Typejector/tsconfig.json', {typescript: require('typescript')});

gulp.task('build', function () {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest(''));
});

gulp.task('example', function () {
    var tsResult = gulp.src('Example/**/*.ts')
        .pipe(ts({
            typescript: require('typescript'),
            experimentalDecorators: true,
            target: 'es5',
            noImplicitAny: false,
            sourceMap: true,
            declarationFiles: true
        }));
    return tsResult.js.pipe(gulp.dest('Example/'));
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