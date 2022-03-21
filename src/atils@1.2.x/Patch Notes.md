# `atils@1.2.x`
## `@1.2.0-dev`
#### This section pertains to the Dev Build of atils. You can install it by running:
#### `npm i atils-dev`
The dev-build changes a fair bit of things that `atils` worked on.<br>
For example, the `EnumUtility` and `ErrorUtility` are entirely different from their predecessors in `@1.1.4`, and now support tons more.
In the dev-build, we also have the `ErrorClient`, which can manage Errors.

- Removed the `EnumClient`, as well as it's counterparts.
- Removed the `ObjectUtility`.
- Removed the `modify()`, `base()`, and `seal()` methods from the `StructureUtility`.

- Renamed **all** utilities to remove `Utility` from their name.
    - They will henceforth be referred to as what they were written as in the code.
- Reworked how `Enum`s work.
- Reworked how the `ErrorBuilder` class works.
- Reworked the `ConsoleStyles` Enum.
- `Structure` class can now take in different variants of parameters.

- Added `soft`.
    - `soft` is a simple way to rename your `node_modules` folder. **Using `soft` in the dev-build isn't recommended.**
- Added the `ErrorClient`.
- `Enums` now hold individual `Resolvers`, or you can just resovle an entire `Resolver` with the `resolve()` method.
- Added the `URL` Structure Type to `Structure`.


- Removed the Concept Board for @1.2.x.
    - Rejected Ideas:
        - Reintroduce the `RequestUtility` under the name `APIUtility`.
        - Allow for the `ConsoleUtility` to parse `Enums` and the information stored in them.

## `@1.2.0`
After a while of working, and another while to rest, I've finally finished `@1.2.0`!<br>
Please know that this version is **based from** the dev-build in `@1.2.0-dev`.<br>

- Removed the `ErrorClient` introduced in the dev-build.
- Removed the `EnumClient`, as well as it's counterparts, from `@1.1.x`.
- Removed the `ObjectUtility` from `@1.1.x`.
- Removed the `modify()`, `base()`, and `seal()` methods from the `StructureUtility`.

- Renamed **all** utilities to remove `Utility` from their name.
- Reworked how `Enum`s work (they work differently than how they did in the dev-build).
- Reworked how the `ErrorBuilder` class works (it works slightly differently than how it did in the dev-build).
- Reworked the `ConsoleStyles` Enum.
- Slightly reworked the `Merge` class.
- `Structure` class can now take different variants of parameters.
- Renamed the `is()` method in the `Structure` class to `matches()`.

- Added `soft`.
    - `soft` is a simple way to rename your `node_modules` folder.
    - **run a new `soft` class once and it will provide instructions**
    - **if you do not know how to use it, then don't**; also, this will not work with replit or other hosting services.
- Added the `catch()`, `throw()`, and `force()` methods to the `ErrorBuilder` to replicate what the `ErrorClient` did in the dev-build.
- Added `RawEnums`.
- Added `RawErrors` (a replica of the `BaseError` previously used).
- Added the `History` function, which will retrieve a previous final draft of atils.
- Added the `URL` Structure Type to `Structure`.

## Thank you for using atils.
