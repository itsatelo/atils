# atils
This is just a bunch of utilities that I'd find useful.<br>

**Here's a tip!**
Open a Version Directory to find a README file containing the current patch notes for that version!

[Documentation](https://atils.js.org)<br>
[NPM](https://npmjs.com/package/atils)<br>
[GitHub](https://github.com/itsatelo/atils)<br>
[Twitter](https://twitter.com/itsatelo)<br>

Current Release: **1.1.4**<br>
Updated: `2/28/2022` by `itsatelo`

# Notice
## `@1.2.0`
I've started to work on `atils@1.2.0`! **Every** Utility will be rewritten to better suite how the project should have gone a long time ago, and it'll be ready for when it's needed by others.

*You will be able to use `@1.1.4` when you install `@1.2.0`, just use the following snippet:*
```js
const atils = require('atils').Previous;
```
*If `@1.3.0` is released, then this is how you would install `@1.1.4` and `@1.2.0`:*
```js
const { History } = require('atils');
const { Previous } = require('atils');
let atils = History('v1.1.x'); // You can also provide the parameters: 'v1.1.4', '1.1.x', '1.1', 'v1.1', '1.1.4'
atils = Previous;
```

Just know that you will not be able to install specific versions, such as `@1.1.3`, `@1.0.9-stable`, etc.
