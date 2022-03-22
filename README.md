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

# We hit 1,000 downloads!
Woohoo! 1,000! That's a pretty big number if I do say so myself! Thanks for using atils.

---

> Patch Notes for atils@1.2.1
- Added the `require()` method to the `Soft Manager`. Alias of the `request()` method.
- Fixed an issue where the `Soft Manager` would only request files from the index directory.

> Patch Notes for atils@1.2.2
- Fixed atils logging "false" to the console whenever your script was ran.
- Fixed an issue where the `Console` Class would throw an error when no options are provided.
- Fixed an issue where the `Structure` Class would return false when a Boolean is used.
- Fixed an issue with the `ConsoleStyles` Resolver Functions.

- Added new Styles to the `ConsoleStyles` Enum.
- The `Structure` Class will now determine if an item is an instance of another item if it doesn't fit in the provided categories.
  - An example of this is clarifying a Client class. Just use the class (the definition, not a new invocation) as a parameter.
  - ```js
    const { Structure } = require('atils');
    class A {};
    const structure = new Structure({
      example: A,
    });

    structure.matches({
      example: new A(),
    }); // true
    ```

## notice board
> - The (Deprecated) Dev Build for `atils@1.2.0` can now be installed by using the `v1.2.x-dev` parameter with the `Versions` function.<br>

> - Development for `atils@2.0.0` has begun, and the dev build is now in progress. It will be released through the `atils-dev` package periodically.<br>

## installing
**@1.1.x**<br>
`npm i atils`<br>
```js
const { Versions } = require('atils');
const atils = Versions('v1.1.x');
```

**@1.2.x-dev**<br>
*Notice: This build was a Concept Version for atils. It has no documentation and it is unclear if it properly functions.*<br>
`npm i atils` **or** `npm i atils-dev@1.2.0`
```js
const { Versions } = require('atils');
const atils = Versions('v1.2.x-dev');
```
**or** (if you use the dev package)
```js
const atils = require('atils-dev');
```

**@1.2.x**<br>
`npm i atils`<br>
```js
const atils = require('atils');
```

**@2.0.x-dev**<br>
*Notice: This build is a development build for atils@2.0.0. It has no documentation and it is unclear if it properly functions.*<br>
`npm i atils-dev`
```js
const atils = require('atils-dev');
```

## about `atils`
atils is a collection of utilities meant to make the lives of JavaScript developers easier.<br>
Over the course of four months, I've learned a lot about programming and computers in general, and wanted to make something to make **my** life easier, which I did by simple creating an npm package. It was originally just meant for me to merge a couple classes together and have better looking errors, but now I've made a ton of other stuff that winds up helping me quite a bit.

## dev builds
atils has a dev build package available. It will contain the test builds for `@2.0.0`.<br>
Install it by using `npm i atils-dev`.

## documentation
All of the documentation for the latest release of atils is at [`atils.js.org`](https://atils.js.org), however, there will be some examples available here.<br>

## links
> - [Support Discord](https://discord.gg/JPch96WjJv)

> - [NPM Package](https://npmjs.com/package/atils)

> - [GitHub Repository](https://github.com/itsatelo/atils)

> - [itsatelo's Twitter](https://twitter.com/itsatelo)

> - [itsatelo's Discord](https://discord.gg/JPch96WjJv)

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

## contributors
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
<br><br>

- `CU-RF.001` - Occurs when no item was provided for the title of the Console's record feature.
- `CU-RF.002` - Occurs when no item was provided for the message of the Console's record feature.
- `CU-RF.003` - Occurs when a non-Object item was provided for the options.styles of the Console.
- `CU-RF.004` - Occurs when a non-Array item was provided for the options.styles.title for the Console.
- `CU-RF.005` - Occurs when a non-Array item was provided for the options.styles.message for the Console.
- `CU-RF.006` - Occurs when a non-Array item was provided for the options.styles.info for the Console.
<br><br>

- `EM-F.001` - Occurs when a non-Object item was provided for an Enum.
- `REM-F.002` - Occurs when a non-String item was provided for the name of a RawEnum.
- `REM-F.003` - Occurs when a non-Object item was provided for a RawEnum.
<br><br>

- `SE-F.001` - Occurs when a non-Object item was provided for a Structure.
<br><br>

## Thank you for using `atils`.
Latest NPM Update: `3/21/2022` by `@itsatelo` - `atils@1.2.2`<br>
Project Started On: `11/26/2021` by `@itsatelo` - `atils@1.0.0`<br>
