# gulp-better-sass-inheritance

[![Build Status](https://travis-ci.org/Jeff2Ma/gulp-better-sass-inheritance.svg?branch=master)](https://travis-ci.org/Jeff2Ma/gulp-better-sass-inheritance)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/Jeff2Ma/gulp-better-sass-inheritance?branch=master&svg=true)](https://ci.appveyor.com/project/Jeff2Ma/gulp-better-sass-inheritance)
[![npm version](https://badge.fury.io/js/gulp-better-sass-inheritance.svg)](https://www.npmjs.com/package/gulp-better-sass-inheritance)

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

Suggest to work with [gulp-sass](https://www.npmjs.com/package/gulp-sass).


```javascript
var gulp = require('gulp');
var sassInheritance = require('gulp-better-sass-inheritance');
var sass = require('gulp-sass');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
 
gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
 
      //filter out unchanged scss files, only works when watching 
      .pipe(gulpif(global.isWatching, cached('sass')))
 
      //find files that depend on the files that have changed 
      .pipe(sassInheritance({base: 'src/styles/'}))
 
      //process scss files 
      .pipe(sass())
 
      //save all the files 
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['sass', 'other-task'], function() {
	global.isWatching = true;
    //your watch functions... 
});
```