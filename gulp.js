// Based on https://github.com/sindresorhus/gulp-plugin-boilerplate/blob/master/index.js

'use strict';

var gutil = require('gulp-util');
var through2 = require('through2');
var webkitAssign = require('./index');

module.exports = function () {
    return through2.obj(function (file, encoding, callback) {
        // `encoding` is not used here.
        /* jshint unused: true */

        if (file.isNull()) {
            callback(null, file);
            return;
        }

        // Support streams (i.e., `gulp.src(..., { buffer: false })`). See
        // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/dealing-with-streams.md
        if (file.isStream()) {
            var webkitAssignStream = webkitAssign();
            webkitAssignStream.on('error', this.emit.bind(this, 'error'));
            file.contents = file.contents.pipe(webkitAssignStream);
            callback(null, file);
            return;
        }

        try {
            file.contents = new Buffer(webkitAssign(file.contents.toString()));
            this.push(file);
        } catch (error) {
            this.emit('error', new gutil.PluginError('webkit-assign', error));
        }

        callback();
    });
};
