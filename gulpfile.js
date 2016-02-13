
var gulp = require('gulp');
var Server = require('karma').Server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    // place code for your default task here
});

//Run all Jasmine unit tests (using Karma)
gulp.task('unit-tests', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('minify', function() {
    return gulp.src('js/*.js')
        .pipe(concat('dx.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});