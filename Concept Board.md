# atils@1.2.x Concept Board
- Decommission the current `EnumClient` and allow `EnumGroups` to more easily access `Enums`.
    - This is because there is no need to have a "manager for a manager". The `EnumClient` may be revisited in the future if `EnumGroups` are that vastly used.
    - Being deprecated in: `@1.2.0`
    - Being decommissioned in: `@1.2.2`

- Allow for the `StructureUtility` to read URLs.
    - Maybe in `@1.2.1` I'll allow for determining if URLs are harmful, then notifying the Client? That'd be pretty cool.

- Reintroduce the `RequestUtility` under the name `APIUtility`.
    - This will allow you to make API Requests smaller.
    - This **might** simplify Request information. That'd be a lot of work, though.

- Allow for the `ConsoleUtility` to parse `Enums` and the information stored in them.

- Remove the `Parameters` concept from `Enums`; just use Objects as it's `Value`.