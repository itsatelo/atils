/** 
 * The raw instance of the Error Manager. For easier usage, please see {@link ErrorManager}. 
 * @class
 */
class RawErrorManager extends Error {
    /**
     * Creates a brand new Error based on the specified parameters.
     * @param {string} errorTitle - The name of the Error.
     * @param {string} errorDescription - The message provided for the Error.
     */
    constructor(errorTitle, errorDescription) {
        super(errorDescription);
        this.name = errorTitle;
    }
}

/** 
 * The basic Error Manager function to simplify the usage of {@link RawErrorManager}.
 * @function
 * @param {string} errorTitle - The name of the Error.
 * @param {string} errorDescription - The message provided for the Error.
*/
function ErrorManager(errorTitle, errorDescription) {
    throw new RawErrorManager(errorTitle, errorDescription);
}

module.exports = { RawErrorManager, ErrorManager };