<p align="center">
    <img src="https://images-ext-2.discordapp.net/external/1errZVaPQaLihNCSJXaUiWthDawO-3Ih-ndFypQiqh0/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/539215596051496960/f320e8dc6fd7607897dcb58604cab41c.png"><br>
    <img src="https://img.shields.io/npm/dt/atils?color=5094ef&label=total%20downloads&logoColor=5094ef&style=plastic">
    <img alt="npm" src="https://img.shields.io/npm/dw/atils?color=e0495f&label=weekly%20downloads&style=plastic">
    <img src="https://img.shields.io/npm/v/atils?color=ef5094&label=version&logoColor=5094ef&style=plastic">
    <img alt="npm collaborators" src="https://img.shields.io/npm/collaborators/atils?label=collaborators&style=plastic">
    <img src="https://img.shields.io/discord/944301669489975367?color=094e5f&label=support%20discord&style=plastic">
    <img src="https://img.shields.io/github/last-commit/itsatelo/atils?color=e4f950&label=last%20github%20commit&style=plastic">
    <img src="https://img.shields.io/github/issues-raw/itsatelo/atils?color=4e0f95&style=plastic">
</p>

## update: @1.2.1
> Bug Fixes for @1.2.0<br>
- Added the `require()` method to the `Soft` Manager. Redirects to the `request()` method.
- Fixed an issue where the `Soft` Manager would request files from the index directory.
- Fixed an issue where the `Console` Class would error out when no options are given.
  - Please know that I'm uncertain if this issue is actually resolved, hence why it's still open on GitHub.

**If you find any issues, please submit them on GitHub. That will help me resolve them later.**<br>

## installing
To install the latest build of `atils`, run the following snippet in your terminal:<br>
`npm install atils`<br>

To install the dev build of `atils`, run the following snippet in your terminal:<br>
`npm install atils-dev`<br>

To install a specific version of `atils`, run the following snippet in your terminal: <br>
`npm install atils@1.1.4`<br>
*This example uses `@1.1.4`, but you can replace that with any version.*

## about `atils`
atils is a collection of utilities meant to make the lives of JavaScript developers easier.<br>
Over the course of three months, I've learned a lot about programming and wanted to do things like this instead of having to rewrite or copy something for every project I worked on; and so I came up with an NPM Package.

## dev builds
atils has a dev build package! Well, as of right now all it has is the concept for `@1.2.0`, which should work as intended.<br>
I don't recommend using the dev-build in comparison to the actual build, but if you want to, go ahead.

## documentation
All documentation is over at [`atils.js.org`](https://atils.js.org), however, there will be some examples here.<br>

## examples
### RawEnum
```js
const { RawEnum } = require('atils');
const exampleEnum = new RawEnum('testingEnum', { text: "hello world" });

console.log(exampleEnum.resolve("text");
// Console Output: hello world
```

### RawError
```js
const { RawError } = require('atils');
throw new RawError("Testing Error", "this error is a test.");
// Console Output: Testing Error: this error is a test.
```

### ConsoleStyles (Enum)
```js
const { ConsoleStyles, Style, Color, BackgroundColor } = require('atils');
const red = ConsoleStyles.resolveTextColor('red');
console.log(red + "hello world");
// Console Output: \x1b[31mhello world (\x1b[31m changes the color to red)

const cyan = Color("cyan");
console.log(cyan + "hello world 2");
// Console Output: \x1b[36mhello world 2 (\x1b[36m changes the color to cyan)
```

### Console
```js
const { Console } = require('atils');
const c = new Console();
c.log(`hello world`);
// Console Output: hello world
c.record(`@Client`, `sent a message`, { ID: 0001 });
// Console Output: 
// @Client sent a message
// Provided Data:
//     ID: 0001
```

### Enum
```js
const { Enum } = require('atils');
const example = new Enum({
  string: {
    one: "hello world",
  },
  
  boolean: {
    one: true,
  }
});

console.log(example.resolveString('one'));
console.log(example.resolveBoolean('one'));
// Console Output:
// hello world
// true
```

### Error
```js
const { ErrorBuilder } = require('atils');
const error = new ErrorBuilder('Error Name', 'This is an example error.', {
  date: true,
  stackTrace: true,
  logStackTraces: true,
  autocatch: false,
});

error.throw();
// Console Output:
// Error Name: This is an example error
// <Current Date>
// <Stack Trace>
```

### Merge
```js
const { Merge } = require('atils');
class A {};
class B {};
class C extends new Merge(A, B) {
  constructor() {
    super(['params', 'for', 'a'], [['params',], 'for', 'b']);
  }
}
```

### Soft
**This is the setup script for Soft. There will be another example explaining how to use it.**
```js
const { Soft } = require('atils');
new Soft(true);
// this will ignore the explanation and will create a file in the main directory
```
**This is the example script for Soft.**
```js
const Soft = require('./soft.atils.js');
const soft = new Soft('mods');
require = soft.request;
// say you want to get discord.js

const discordjs = require('discord.js');
```

### Structure
To see all structure types, check the documentation!
```js
const { Structure } = require('atils');
const ex = new Structure({
  array: Array,
  any: "*",
  url: "://",
});

console.log(ex.matches({
  array: [],
  any: "this is any",
  url: "https://npmjs.com/package/atils",
}));
// true

console.log(ex.matches({
  array: "hello",
  any: "any",
  url: "hihi",
});
// false
```

## links
- [Support Discord](https://discord.gg/JPch96WjJv)
- [NPM Package](https://npmjs.com/package/atils)
- [GitHub Repository](https://github.com/itsatelo/atils)

- [itsatelo's Twitter](https://twitter.com/itsatelo)
- [itsatelo's Discord](https://discord.gg/JPch96WjJv)

## Contributors
- `itsatelo`

## error codes
- `EB-F.001` - Occurs when no item was provided for the name of the ErrorBuilder.
- `EB-F.002` - Occurs when no item was provided for the message of the ErrorBuilder.
- `EB-F.003` - Occurs when a non-Object item was provided for the options of the ErrorBuilder.
- `EB-F.004` - Occurs when a non-Boolean item was provided for the date option of the ErrorBuilder.
- `EB-F.005` - Occurs when a non-Boolean item was provided for the stackTrace option of the ErrorBuilder.
- `EB-F.006` - Occurs when a non-Boolean item was provided for the logStackTrace option of the ErrorBuilder.
- `EB-F.007` - Occurs when a non-Boolean item was provided for the autocatch option of the ErrorBuilder.
- `EB-F.008` - Occurs when a non-String item was provided for the name of the ErrorBuilder.
- `EB-F.009` - Occurs when a non-String item was provided for the message of the ErrorBuilder.
<br>

- `CU-RF.001` - Occurs when no item was provided for the title of the Console's record feature.
- `CU-RF.002` - Occurs when no item was provided for the message of the Console's record feature.
- `CU-RF.003` - Occurs when a non-Object item was provided for the options.styles of the Console.
- `CU-RF.004` - Occurs when a non-Array item was provided for the options.styles.title for the Console.
- `CU-RF.005` - Occurs when a non-Array item was provided for the options.styles.message for the Console.
- `CU-RF.006` - Occurs when a non-Array item was provided for the options.styles.info for the Console.
<br>

- `EM-F.001` - Occurs when a non-Object item was provided for an Enum.
- `REM-F.002` - Occurs when a non-String item was provided for the name of a RawEnum.
- `REM-F.003` - Occurs when a non-Object item was provided for a RawEnum.
<br>

- `SE-F.001` - Occurs when a non-Object item was provided for a Structure.

## other information
Latest NPM Update: `3/12/2022` by `@itsatelo` - `atils@1.2.1`<br>
Project Started On: `11/26/2021` by `@itsatelo` - `atils@1.0.0`<br>

Thank you for using `atils`!<br>
  -- @itsatelo