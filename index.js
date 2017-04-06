'use strict';

var path = require('path');
var es = require('event-stream');
var _ = require('lodash');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var sassGraph = require('sass-graph');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-better-sass-inheritance';

var stream;

function gulpBetterSassInheritance(options) {
	options = options || {};

	var files = [];
	var filesPaths = [];
	var graph;

	if (!options.base) {
		throw new PluginError(PLUGIN_NAME, 'Missing option `base`!');
	}

	var basePath = path.resolve(process.cwd(), options.base);

	// gutil.log(basePath)

	function writeStream(currentFile) {
		if (currentFile && currentFile.contents.length) {
			files.push(currentFile);
		}
	}

	function check(_filePaths) {
		_.forEach(_filePaths, function (filePath) {
			filesPaths = _.union(filesPaths, [filePath]);
			if (graph.index && graph.index[filePath]) {
				var fullpaths = graph.index[filePath].importedBy;

				if (options.debug) {
					gutil.log('File \"', gutil.colors.magenta(path.relative(basePath, filePath)), '\"');
					gutil.log(' - importedBy', fullpaths);
				}
				filesPaths = _.union(filesPaths, fullpaths);
			}
			if (fullpaths) {
				return check(fullpaths);
			}
		});
		return true;
	}

	function endStream() {
		if (files.length) {
			graph = sassGraph.parseDir(options.base, options);

			check(_.map(files, function (item) {
				return item.path;
			}));

			vfs.src(filesPaths, {'base': options.base})
				.pipe(es.through(
					function (f) {
						stream.emit('data', f);
					},
					function () {
						stream.emit('end');
					}
				));
		} else {
			stream.emit('end');
		}
	}

	stream = es.through(writeStream, endStream);

	return stream;
}
module.exports = gulpBetterSassInheritance;
