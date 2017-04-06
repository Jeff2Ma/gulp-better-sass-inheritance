# gulp-better-sass-inheritance

> Recompile only changed sass/scss files and their dependencies (extended, included or imported).

Based on [gulp-sass-inheritance-plus](https://www.npmjs.com/package/gulp-sass-inheritance-plus).

Solve the bugs in based plugin and make better performace.

NPM Page: [https://www.npmjs.com/package/gulp-better-sass-inheritance](https://www.npmjs.com/package/gulp-better-sass-inheritance)

## Usage

### Install

```bash
npm i gulp-better-sass-inheritance -D
```

### Gulp file

```javascript
var gulp = require('gulp');
var sassInheritance = require('gulp-better-sass-inheritance');
var sass = require('gulp-sass');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
 
gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
 
      //filter out unchanged scss files, only works when watching 
      .pipe(gulpif(global.isWatching, cached('sass')))
 
      //find files that depend on the files that have changed 
      .pipe(sassInheritance({base: 'src/styles/'}))
 
      //filter out internal imports (folders and files starting with "_" ) 
      .pipe(filter(function (file) {
        return !/\/_/.test(file.path) || !/^_/.test(file.relative);
      }))
 
      //process scss files 
      .pipe(sass())
 
      //save all the files 
      .pipe(gulp.dest('dist'));
});
gulp.task('setWatch', function() {
    global.isWatching = true;
});
gulp.task('watch', ['setWatch', 'sass'], function() {
    //your watch functions... 
});
```