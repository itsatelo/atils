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

## Expected Changes for: `atils@1.1.2`
- Deprecate the `StructureUtility`'s auto-redefining function in favor of the `is()` method.
- Add the `is()` method to the StructureUtility; will have the same functionality of the auto-redefining function.