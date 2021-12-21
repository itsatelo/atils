/**
 * @class
 * @extends [Error]{@link https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/error}
 * @description A simplistic Error Manager.
 */
class ErrorUtility extends Error {
    /**
     * Creates a new Error.
     * @param {string} name - The name of the Error.
     * @param {string} message - The message of the Error.
     */
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = {
    ErrorUtility,
}