# Atils
This is just a few utilities you might find useful.
-----
## Overview
`npm i atils`
```js
const atils = require('atils');
```

Atils is a simplistic package made to make your everyday life easier, even if by just a bit.<br>
More things will be added as I see that I might need them in the future.<br>

[`Contact Support Server`](https://discord.gg/jCZRZDjkzf)
---
## Example Usages
### MergeUtility<br>
The MergeUtility is a simple function to allow for **multi-inheritance**, which is inheriting from two or more classes. There are two ways of using the MergeUtility.<br>
1. The `MergeUtility` function.
2. The `RawMergeUtility` function.

The difference between the two is what's required, as well as customization.<br>
In the future, the `RawMergeUtility` will be able to downgrade to previous versions of itself.<br>
However, the `MergeUtility` doesn't require you to use an array (not much of a difference).

Using the **`MergeUtility`**:
```js
const { MergeUtil } = require('atils');
// You can also change MergeUtility to Classes

class A {
    constructor(data) {
        this.one = data;
    }
}

class B {
    constructor(data) {
        this.two = data;
    }
}

class C extends MergeUtil(A, B) {
    constructor(data) {
        super(data);
    }

    run() {
        console.log(this.one, this.two);
    }
}

const a = new C(["Hello", "World"]);
a.run();
    // Output:
    // Hello World
```

Using the **`RawMergeUtility`**:
```js
const { RawMergeUtil } = require('atils');
class A {
    constructor(data) {
        this.one = data;
    }
}

class B {
    constructor(data) {
        this.two = data;
    }
}

class C extends RawMergeUtil([A, B], { Version: 102 }) {
    constructor(data) { super(data); }
    run() { console.log(this.one, this.two); }
}
```
And so on.<br>
Please do note that the formatting of parameters (what you put into C's constructor method) is weird!
```
[ - Sent into different parent classes.
    [ - Sent into different parameters of the same parent class.
        [ - An array sent to one parameter of the parent class.

        ]
    ]
]
```
The above is the format you should follow when using the MergeUtility.
---
### ErrorUtility<br>
The ErrorUtility is just a simpler way to create errors.<br>
I'd suggest you use the `ErrorManager`, rather than it's `RawErrorManager` counterpart, as it's quicker.
```js
const { ErrorManager, RawErrorManager } = require('atils');
// You can change ErrorManager into ErrorUtil or error

ErrorManager("UhOh Error", "I did an oopsie!");
throw new RawErrorManager("UhOh Error", "I did an oopsie!");
```
Yeah, that's all there is for that.
---
### ConsoleUtility<br>
The ConsoleUtility is a simpler way to send information to your console!<br>
I made this with [`discord.js`](https://npmjs.com/package/discord.js) in mind, as I send a lot of information to my console.

```js
const { ConsoleUtil } = require('atils');
// You can change ConsoleUtil into Console or log

ConsoleUtil("Name", "created a new thing", { name: "Thing", id: "001", time: new Date() });
// output:
// Name created a new thing:
//   name: Thing
//   id: 001
//   time: <time>
```
---
### CollectionUtility<br>
The CollectionUtility is a simple way to have collections of items in arrays.
```js
const { Collection } = require('atils');
const things = new Collection();
things.set("two", "world");
things.set("one", "hello");
console.log(things.get("one"), things.get("two"));
    // output:
    // hello world
```

Methods:<br>
Method | Description | Parameters | Version
|---|---|---|---|
`clear()` | Clears all values saved. | `N/A` | `1.0.2`
`set()` | Sets a value to a key. | `key`, `value` | `1.0.2`
`all()` | Returns all keys and values in an array. | `N/A` | `1.0.2`
`exists()` | Checks if a key exists. | `key` | `1.0.2`
`allExists()` | Checks if all items of an array exists. | `keys` | `1.0.2`
`anyExists()` | Checks if any items of an array exists. | `keys` | `1.0.2`
`has()` | Returns true if the Collection contains a value. | `value` | `1.0.2`
`first()` | Returns the first pair in the Collection. | `N/A` | `1.0.2`
`get()` | Gets a value from a key in the Collection. | `key` | `1.0.2`
`getByValue()` | Gets a key from a value. | `value` | `1.0.2`
`at()` | Gets a value from where it is in the Collection. | `index` | `1.0.2`
