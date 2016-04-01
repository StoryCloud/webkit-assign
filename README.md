# webkit-assign [![Build Status](https://travis-ci.org/StoryCloud/webkit-assign.svg?branch=master)](https://travis-ci.org/StoryCloud/webkit-assign)

Due to [WebKit issue #138038][], assigning to a property of an object created
with `Object.create` may result in the error `TypeError: Attempted to assign to
readonly property.`. This bug is known to affect iOS 8 users and is likely to
occur in recent versions of [Angular.js][] and [PDF.js][].

This utility rewrites the following code

```js
object.$$a = 5;
```

to this

```js
var __webkitAssign__$$a = "$$a";
object[__webkitAssign__$$a] = 5;
```

as a workaround to prevent a `TypeError`.

## Usage

`webkit-assign` provides a CLI interface (when installed globally via `npm i -g
webkit-assign`).  Specify any number of files, and each one will be transformed
and saved to a file with a `.webkitassign.js` extension in the same directory.

For instance, the below command produces a transformed version of `angular.js`
with the name `angular.webkitassign.js` in the same directory:

```bash
$ webkit-assign angular.js
```

In Node.js, you can require `webkit-assign` (when installed locally via `npm i
webkit-assign`), and pass code to the module as a string:

```js
var fs = require('fs');
var webkitAssign = require('webkit-assign');
var original = fs.readFileSync('node_modules/angular/angular.js', 'utf8');
var transformed = webkitAssign(original);
fs.writeFileSync('build/scripts/angular.js', code);
```

You can also obtain a transform stream by calling `webkitAssign()` (without any
arguments), and pipe code through it:

```js
var fs = require('fs');
var webkitAssign = require('webkit-assign');
fs.createReadStream('node_modules/angular/angular.js')
    .pipe(webkitAssign())
    .pipe(fs.createWriteStream('build/scripts/angular.js'));
```

## Plugins

We offer several plugins, all hosted in this repository.

A [gulp][] plugin:

```js
var gulp = require('gulp');
var webkitAssign = require('webkit-assign/gulp');
gulp.src('node_modules/angular/angular.js')
    .pipe(webkitAssign())
    .pipe(gulp.dest('build/scripts'));
```

A [Browserify][] transform:

```js
"browserify": {
  "transform": [
    "webkit-assign/browserify"
  ]
}
```

A [Webpack][] loader:

```js
loaders: [
  {
    test: /angular\.js$/,
    loader: 'webkit-assign/webpack'
  }
]
```

## Contributing

Install the module locally via git:

```js
$ git clone https://github.com/StoryCloud/webkit-assign.git
$ cd webkit-assign
$ npm install
$ npm link
```

Please provide unit tests and documentation for any changes. Try to maintain
existing formatting and naming conventions. You can check your code with `npm
test`.


[WebKit issue #138038]: https://bugs.webkit.org/show_bug.cgi?id=138038
[Angular.js]: https://angularjs.org/
[PDF.js]: https://mozilla.github.io/pdf.js/
[gulp]: http://gulpjs.com/
[Browserify]: http://browserify.org/
[Webpack]: http://webpack.github.io
