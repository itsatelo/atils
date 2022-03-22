/**
 * @class @extends Error
 * @description - Creates a basic Error Instance. This is not used in the new Error Utility.
 * @deprecated - Please use the Error Utility.
 * 
 * @example
 * const { RawError } = require('atils');
 * throw new RawError("Testing Error", "this error is a test.");
 * // Console Output:
 * // Testing Error: this error is a test.
 */
class RawError extends Error {
    /**
     * Constructor method for Raw Errors.
     * @param {string} name - The name of the Error.
     * @param {string} message - The message of the Error.
     */
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = RawError;