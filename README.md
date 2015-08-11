# webkit-assign

Due to [WebKit issue #138038][], assigning to a property on an object created
with `Object.create` may result in the error `TypeError: Attempted to assign to
readonly property.`. This bug is known to affect iOS 8 users and is particularly
likely to happen in recent versions of [Angular.js][] (at least version
`1.4.2`).

This utility rewrites the following code

```js
object.$$a = 5;
```

to this

```js
var __webkitAssign__$$a = '$$a';
object[__webkitAssign__$$a] = 5;
```

as a workaround to prevent a `TypeError`.

## Installation

Via npm:

```bash
$ npm install -g webkit-assign
```

Via git:

```bash
$ git clone https://github.com/StoryCloud/webkit-assign.git
$ cd webkit-assign
$ npm install
$ npm link
```

## Usage

In a directory with the file `angular.js`, create a transformed
`angular.webkitassign.js` in the same directory:

```bash
$ webkit-assign angular.js
```

In a Node.js program, you can obtain a transform stream by calling
`webkitAssign()`, and pipe code through it.

```js
var fs = require('fs');
var webkitAssign = require('webkit-assign');
fs.createReadStream('bower_components/angular/angular.js')
    .pipe(webkitAssign())
    .pipe(fs.createWriteStream('build/scripts/angular.js'));
```

[WebKit issue #138038]: https://bugs.webkit.org/show_bug.cgi?id=138038
[Angular.js]: https://angularjs.org/
