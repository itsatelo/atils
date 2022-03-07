# atils
This is just a bunch of utilities that I'd find useful.<br>

**Here's a tip!**
Open a Version Directory to find a README file containing the current patch notes for that version!

[Documentation](https://atils.js.org)<br>
[NPM](https://npmjs.com/package/atils)<br>
[GitHub](https://github.com/itsatelo/atils)<br>
[Twitter](https://twitter.com/itsatelo)<br>
[Patreon](https://patreon.com/itsatelo)<br>

Current Release: **1.1.4**<br>
Updated: `2/28/2022` by `itsatelo`

# @1.2.0 Notice
### I've started working on `atils@1.2.0`!
It's taking me quite awhile to work on, as I work full-time and am only programming as a hobby.<br>
**When @1.2.0 releases, installing @1.1.4 will still be possible without downgrading.**<br>
The reason I'm doing this is because I want to allow users to mix-and-match between previous versions of utilities, without the trouble of "using multiple require lines".<br>
It'll be quite simple to retrieve `@1.1.4` from `@1.2.0`, just add the following snippet:
```js
const { History } = require('atils');
const atils = History('v1.1.x');
const { ConsoleUtility } = atils; // this is an example of getting specific utility from a previous version of atils.
```

However, **as of yet**, I have no plans of supporting @1.1.4 **if** @2.0.0 or @1.3.0 is released.<br>
I'm also thinking that, after the `@1.2.x` series is done, I should stop working on the project.

**However** in the meantime, you are now able to install the dev build of atils! Use the following snippet:
```
npm i atils-dev
```
to install the dev build.

There's no documentation for the  dev build; so you'd best rely on that intellisense...<br>
Also, don't try using Soft; I'm highly unsure of if it works, and it is quite unstable.<br>
You're also unsure of how it works though.
