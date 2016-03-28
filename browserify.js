// Browserify wrapper for webkit-assign that returns a stream.
//
// A wrapper is necessary because webkitAssign(filename) in index.js checks
// whether the first parameter is a string. Since Browserify passes the filename
// as the first param, webkitAssign calls transformCode() which returns a string
// instead of a stream expected by Browserify.

'use strict';

var webkitAssign = require('./index');
var through2 = require('through2');
var _ = require('lodash');

var defaultOptions = {
    extension: ['.js']
};

module.exports = function (file, options) {
    // Merge options with default options
    _.defaults(options, defaultOptions);
    // Turn single extention option from CLI into array
    if (!_.isArray(options.extension)) {
        options.extension = [options.extension];
    }
    // Check if it matches accepting extention
    var match = _.some(options.extension, function (opt) {
        return _.endsWith(file, opt);
    });

    if (match) {
        return webkitAssign();
    } else {
        return through2();
    }
};
