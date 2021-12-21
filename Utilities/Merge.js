const { ErrorUtility } = require('./Error.js');

/**
 * @class
 * @description MergeUtility in which allows for multi-inheritance.
 */
class MergeUtility {
    #version;
    #classes
    #vessel;
    /**
     * Automatically merges all specified Classes into one.
     * @param {Object} [options] - The Options for the MergeUtility.
     * @param  {...any} [classes] - Classes to be merged.
     * @returns {*} A class that is merged from all previous ones.
     */
    constructor({ version = 1 } = {}, ...classes) {
        this.#version = version;
        this.#classes = classes;

        this.#vessel;
        this.#gateway();

        return () => this.#vessel;
    }

    #gateway() {
        if (this.#version === 1) {
            return this.#version_1();
        }

        return this.#currentVersion();
    }

    #currentVersion() {
        return this.#version_1();
    }

    #version_1() {
        const classes = this.#classes;
        this.#vessel = class {
            constructor(...params) {
                classes.forEach(c => {
                    if (Array.isArray(params[classes.indexOf(c)])) {
                        if (params[classes.indexOf(c)].length > 9) throw new ErrorUtility("MergeError", "The MergeUtility only supports up to 10 Arguments per Class.");
                        Object.assign(this, new c(
                            params[classes.indexOf(c)][0],
                            params[classes.indexOf(c)][1],
                            params[classes.indexOf(c)][2],
                            params[classes.indexOf(c)][3],
                            params[classes.indexOf(c)][4],
                            params[classes.indexOf(c)][5],
                            params[classes.indexOf(c)][6],
                            params[classes.indexOf(c)][7],
                            params[classes.indexOf(c)][8],
                            params[classes.indexOf(c)][9],
                        ));
                    } else {
                        Object.assign(this, new c(params[classes.indexOf(c)]));
                    }
                });
            }
        }

        this.#classes.forEach(c => {
            if (c === undefined) return;
            Object.getOwnPropertyNames(c.prototype)
                .filter(property => property != "constructor")
                .map(property => {
                    this.#vessel.prototype[property] = c.prototype[property];
                });
        });
    }
}

module.exports = { MergeUtility };