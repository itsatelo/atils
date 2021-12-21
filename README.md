# Atils
> A simple package to perform simple things.

[Github](https://github.com/itsatelo/atils)
[Atelo's Twitter](https://twitter.com/itsatelo)

## Dev
> **Dev Log: v1.0.9**<br>
> So, I did a lot over the past couple nights to rewrite Atils to be better than it was. I haven't *entirely* tested everything,<br>
> but I'm pretty sure 90% of it works. If something doesn't work, or you'd like something added, submit an Issue on GitHub.<br>

> **The README file is now limited to Dev Notes and Patch Notes.**<br>
> For Documentation, please see the Github.

> **Patch Notes: v1.0.8**<br>
- Added:
    - ObjectUtility
        - Allows for Object Customization.
        - Can be converted into a Collection.
    - RequestUtility
        - Allows for simple POST and GET requests via Axios.
        - Can submit a GET request directly into a Collection.
- Updated:
    - CollectionUtility
        - Added new Methods to support the new ObjectUtility.
        - Moved some Methods into others for less effort.
    - ConsoleUtility
        - Now allows for multiple types of `info` to be provided.
    - DateUtility
        - Fixed an issue with months not displaying properly.
        - Added customization options.

- Notes:
    - All Utilities were moved into Classes, and now must be called with the `new` keyword.
        - If you'd like me to add functions for each Utility, submit an Issue on GitHub.
    - Both the `ObjectUtility` and `RequestUtility` are still in consideration.
        - They've been added for now, but don't be surprised if they're gone later.

---
`atils` by `atelo`