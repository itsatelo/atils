<p align="center">
    <img src="https://api.itsatelo.com/images/atils"><br>
    <img src="https://img.shields.io/npm/dt/atils?color=5094ef&label=total%20downloads&logoColor=5094ef&style=plastic">
    <img alt="npm" src="https://img.shields.io/npm/dw/atils?color=e0495f&label=weekly%20downloads&style=plastic">
    <img src="https://img.shields.io/npm/v/atils?color=ef5094&label=version&logoColor=5094ef&style=plastic">
    <img alt="npm collaborators" src="https://img.shields.io/npm/collaborators/atils?label=collaborators&style=plastic">
    <img src="https://img.shields.io/discord/944301669489975367?color=094e5f&label=support%20discord&style=plastic">
    <img src="https://img.shields.io/github/last-commit/itsatelo/atils?color=e4f950&label=last%20github%20commit&style=plastic">
    <img src="https://img.shields.io/github/issues-raw/itsatelo/atils?color=4e0f95&style=plastic">
</p>

# A Little Message
The GitHub repo is outdated! I won't be updating it until `atils@2.0.0`, which will be releasing eventually.<br>
I have made quite a bit of progress on it, and here's what I will tell you:<br>
- I'll be introducing new utilities, and reintroducing old ones (that have been removed for a long while).
- I'll be rewriting all of atils in ES6. If necessary, I may write a CommonJS variant (though it will be updated less).
- The `Structure` Utility now depends on a different Utility (basically a broken down variant, being `Type`).
- The `Error` Utility will be reverted to being dependant on node's `Error` Class.
    - This is to help simplify managing a `Error#catch()` statement, so now it's back to the original Try/Catch statements rather than being different from node's standard.
    - You'll now be able to provide parameters to your Errors, which wasn't an option in `@1.2.x`. It will use the same data management as the `Console` utility.
- **You will no longer be able to revert versions.**
    - I doubt you'd want to increase your file count. You can just `npm i atils@1.0.0` because I **KNOW** some of you are still installing that monstrosity.
- atils will now be re-embracing functions. Well, only one, which is to validate an `Enum`.
- There are... five different types of Enums.
    - The regular `Enum` Utility extends the `Frozen Enum`, and **in the future** will allow you to specify options to modify it.
    - The `Frozen Enum` acts as a regular Enum.
    - The `Resolver Based Frozen Enum` acts as an Enum but relies on resolers, rather than a simple `Enum[whatever]`.
    - The `Thawed Enum` is an Enum that's directly modifiable.
    - The `Resolver Based Thawed Enum` is, well, can you guess?
 
 There will be **a lot** more, but that's what I have right now. Fun, right?<br>
 Anyways, if you'd like to ask me questions, join my Discord:<br>
 https://r.itsatelo.com/discord
  
