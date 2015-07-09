'use strict';

var assert = require('assert');
var webkitAssign = require('../index');
var fs = require('graceful-fs');
var path = require('path');

var assertFilesEqual = function (a, b) {
    a = path.resolve(a);
    b = path.resolve(b);
    assert.strictEqual(fs.readFileSync(a, 'utf8'), fs.readFileSync(b, 'utf8'));
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

describe('replace', function () {
    it('should replace properties with variables', function (done) {
        inputOutputTest('replace', done);
    });
    it('should rock angular\'s socks off', function (done) {
        inputOutputTest('angular', done);
    });
});
