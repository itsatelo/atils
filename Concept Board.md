# atils@1.2.x Concept Board
- Decommission the `EnumClient` and allow `EnumGroups` to more easily access `Enums`.
    - This is because there is no need to have a "manager for a manager". The `EnumClient` may be revisited in the future if `EnumGroups` are that vastly used.
    - Being decommissioned in: `@1.2.0`

- Allow for the `StructureUtility` to read URLs.
    - Maybe in `@1.2.1` I'll allow for determining if URLs are harmful, then notifying the Client? That'd be pretty cool.

- Reintroduce the `RequestUtility` under the name `APIUtility`.
    - This will allow you to make API Requests smaller.
    - This **might** simplify Request information. That'd be a lot of work, though.
