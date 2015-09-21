// From: https://github.com/angular/angular.js/issues/9128#issuecomment-140314563
var webkitAssign = require('./index');

module.exports = function (source) {
  this.cacheable();
  return webkitAssign(source);
};
