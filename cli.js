#!/usr/bin/env node

'use strict';

var webkitAssign = require('./index');

webkitAssign(process.argv.slice(2), function (error) {
    if (error) {
        throw error;
    }
});
