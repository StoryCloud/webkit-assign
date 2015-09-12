// Browserify wrapper for webkit-assign that returns a stream.
//
// A wrapper is necessary because webkitAssign(filename) in index.js checks
// whether the first parameter is a string. Since Browserify passes the filename
// as the first param, webkitAssign calls transformCode() which returns a string
// instead of a stream expected by Browserify.

'use strict';

var webkitAssign = require('./index');

module.exports = function () {
    return webkitAssign();
};
