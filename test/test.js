var sassInheritance = require('../index.js');
var should = require('should');
var vfs = require('vinyl-fs');

var exceptFiles = ['_a.scss', '_b.scss', '_c.scss', 'test.scss'];

describe('gulp-better-sass-inheritance', function () {
	it('Basic function test`', function (done) {
		var files = [];
		vfs.src('./test/scss/*.scss')
			.pipe(sassInheritance({base: 'test/scss/'}))
			.on('data', function (file) {
				var fileName = file.relative;
				fileName.should.be.oneOf(exceptFiles);
				files.push(file);
			})
			.once('end', function () {
				files.length.should.equal(4);
				done();
			});
	});
});
