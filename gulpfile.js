const
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    path = require('path'),
    mocha = require('gulp-mocha');

var mainProject = ts.createProject('Typejector/tsconfig.json', {typescript: require('typescript')});
var testProject = ts.createProject('Test/tsconfig.json', {typescript: require('typescript')});

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('compileSource', function () {
    var tsResult = mainProject.src()
        .pipe(ts(mainProject));

    return tsResult.js.pipe(gulp.dest(''));
});

gulp.task('compileExamples', function () {
    var base = 'Example',
        folders = getFolders(base),
        tasks = folders.map(function (folder) {
            console.log(path.join(base, folder, '/*.ts'));

            return gulp.src(path.join(base, folder, '/*.ts'))
                .pipe(ts({
                    typescript: require('typescript'),
                    experimentalDecorators: true,
                    target: 'es5`',
                    noImplicitAny: false
                }))
                .js.pipe(gulp.dest(path.join(base, folder)));
        });
});

gulp.task('compileTests', function () {
    var compileResult = testProject.src()
        .pipe(ts(testProject));

    return compileResult.js.pipe(gulp.dest(''));
});

gulp.task('test', function () {
    return gulp.src('Test/Compiled/typejector.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(function(){
            global.expect = require('expect');
        })
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('clean', function () {
    return gulp.src([
            '*/Compiled/**/*.js',
            '*/Compiled/**/*.js.map',
            '*/Compiled/**/*.d.ts',
            'Test/Test/**/*.js',
            'Test/Test/**/*.js.map',
            'Test/Test/**/*.d.ts',
            'Typejector/Core/**/*.js',
            'Typejector/Core/**/*.js.map',
            'Typejector/Core/**/*.d.ts',
            'Typejector/MEF/**/*.js',
            'Typejector/MEF/**/*.js.map',
            'Typejector/MEF/**/*.d.ts',
            'UnitTest/Typejector/**/*.js',
            'UnitTest/Typejector/**/*.js.map',
            'UnitTest/Typejector/**/*.d.ts'
        ], {read: false})
        .pipe(clean({force: true}));
});

gulp.task("build", ["clean", "compileSource", "compileTests", "compileExamples", "test"]);