# `atils@1.1.x`
## 1.1.0 / 1.1.0-build
- Removed the `CollectionUtility`, `DateUtility`, and `RequestUtility` until further notice.
- Added the `StructureUtility` and the `EnumUtility`.
- Reworked all other Utilities.

## 1.1.1
- Fixed an issue where the `StructureUtility` wouldn't resolve options correctly.
- Fixed folder names not being correct for the version (1.1.x is the new folder name).

- Deprecated the `getGroup()` method of the EnumUtility in favor of `getGroups()`.

- Added the `getGroups()` method to the EnumUtility; this will allow the client to retrieve an Array of EnumGroups, rather than one at a time.

## 1.1.2
- Fixed the `StructureUtility` displaying `false` no matter the circumstances.
- Fixed the `StructureUtility`'s Example not displaying the `enum` Structure Type in the documentation.

- Removed the `StructureUtility`'s self-defining function in favor of the `is()` method.
- Removed the `ConsoleUtility`'s instability warning.

- Added the `is()` method to the `StructureUtility`.

## 1.1.3
- Fixed an issue where the `StructureUtility` would ignore typos and return `true`.
- Renamed the `EnumManager` to `EnumClient`
    - See Concept Board for `@1.2.0`
    
- Added the `modify()` method to the `StructureUtility`.
- Added the `base()` method to the `StructureUtility`.
- Added the `seal()` method to the `StructureUtility`.
- Added the `enum group` and `enum client` Structure Types for the `StructureUtility`.

+ **Important**: `@1.2.0` Concept Board out. See MD file.
    - Concept Boards will be used to determine what will be released in the next updates, because I can't remember things.

## 1.1.4
- Fixed an issue with information display with the `ConsoleUtility`.
- Updated the `@1.2.0` Concept Board.

- Added the `any` Structure Type for the `StructureUtility`.

+ **Important**: `@1.2.0` Concept Board out. See MD file.
    - Concept Boards will be used to determine what will be released in the next updates, because I can't remember things.


## Expected Changes for: `atils@1.1.5`
**There are no expected changes for this update.**<br>
Please check the [GitHub](https://github.com/itsatelo/atils) later to see if there are any changes to this.