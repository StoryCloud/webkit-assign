'use strict';

var assert = require('assert');
var fs = require('graceful-fs');
var gulpPlugin = require('../gulp');
var gutil = require('gulp-util');
var path = require('path');
var webkitAssign = require('../index');

var getFileContents = function (file) {
    return fs.readFileSync(path.resolve(file), 'utf8');
};

var assertFilesEqual = function (a, b) {
    assert.strictEqual(getFileContents(a), getFileContents(b));
};

var inputOutputTest = function (prefix, done) {
    webkitAssign(['./test/fixtures/' + prefix + '.input.js'], function (error) {
        if (error) {
            return done(error);
        }
        assertFilesEqual(
            './test/fixtures/' + prefix + '.input.webkitassign.js',
            './test/fixtures/' + prefix + '.expected.js'
        );
        done();
    });
};

describe('parse', function () {
    it('should not fail on null nodes', function () {
        assert.doesNotThrow(function () {
            webkitAssign('[,0]');
        });
    });
});

describe('replace', function () {
    it('should replace properties with variables', function (done) {
        inputOutputTest('replace', done);
    });
    it('should preserve directive placement', function (done) {
        inputOutputTest('directive', done);
    });
    it('should preserve whitespace', function (done) {
        inputOutputTest('whitespace', done);
    });
    it('should rock angular\'s socks off', function (done) {
        inputOutputTest('angular', done);
    });
    it('should do nothing when there are no properties', function (done) {
        inputOutputTest('no-properties', done);
    });
    it('should only create one variable per name', function (done) {
        inputOutputTest('duplicates', done);
    });
});

describe('gulp', function () {
    // Based on https://github.com/sindresorhus/gulp-plugin-boilerplate/blob/master/test.js
    it('should transform as a gulp plugin', function (done) {
        var stream = gulpPlugin();
        stream.on('data', function (file) {
            assert.strictEqual(
                file.contents.toString(),
                getFileContents('./test/fixtures/replace.expected.js')
            );
        });
        stream.on('error', done);
        stream.on('end', done);
        var fixture = './test/fixtures/replace.input.js';
        stream.write(new gutil.File({
            base: path.resolve('./test/fixtures'),
            path: path.resolve(fixture),
            contents: new Buffer(getFileContents(fixture))
        }));
        stream.end();
    });
});
