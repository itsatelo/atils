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

## Expected Changes for: `atils@1.1.3`
- Rename the `EnumManager` to `EnumClient`.
    - Expect this to be decommissioned in `@1.2.0`.
- Rename the `EnumGroup` to `EnumManager`.
- Add the `modify()` method to the `StructureUtility`.
- Add the `base()` method to the `StructureUtility`.
- Add the `seal()` method to the `StructureUtility`.
- Add the `url` type to the `StructureUtility`.
- Allow for the `StructureUtility` to read for `ObjectUtility`.