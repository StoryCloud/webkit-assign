# webkit-assign

Due to [WebKit issue #138038][], assigning to properties on an object created
with `Object.create` under strict mode may result in the error `TypeError:
Attempted to assign to readonly property.`. This bug is known to affect iOS 8
users and is particularly likely to happen in recent versions of [Angular.js][]
(at least version `1.4.2`).

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

## Usage

```bash
# Create a transformed `angular.webkitassign.js` in the same directory:
$ webkit-assign angular.js
```

## Disclaimer

The implementation uses a regular expression, so e.g. if there is a comment
immediately after an assignment operator, your code might not be transformed
correctly.

Also, if there is a directive such as `"use strict";` at the beginning of your
file (before anything else, barring comments), the `var` statement will be
placed before it, which will negate the directive, as a directive must be the
first thing in a script or function. So follow the best practice for browsers
and put `"use strict";` inside a function.

We may eventually rewrite this program to use an AST, which would fix these edge
cases. Pull requests are welcome.

[WebKit issue #138038]: https://bugs.webkit.org/show_bug.cgi?id=138038
[Angular.js]: https://angularjs.org/
