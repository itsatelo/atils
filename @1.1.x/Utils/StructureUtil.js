const { Enum } = require('../Structures/Enums/Enum.js');
const { EnumGroup } = require('../Structures/Enums/EnumGroup.js');
const { EnumManager } = require('./EnumUtil.js');
const { ObjectUtil } = require('./ObjectUtil.js');

const Structures = {
    STRING: "string",
    BOOLEAN: "boolean",
    NUMBER: "number",
    BIGINT: "bigint",
    ARRAY: "array",
    SYMBOL: "symbol",
    FUNCTION: "function",
    ENUM: "enum",
}

/**
 * @class
 * @version v1.0.0
 * @description - Defines structures in a simpler manner.
 */
class StructureUtil {
    /**
     * Constructor method for the StructureUtil.
     * @param {Object} base - The basic Structure format.
     * @example
     * // expected output: true
     * const structure = new Structure({
     *     exampleString: "string",
     *     exampleBoolean: "boolean",
     * });
     * 
     * structure({ exampleString: "HI!", exampleBoolean: true }).then(is => {
     *     console.log(is);
     * });
     * @example
     * // Types of Structures
     * const structure = new Structure({
     *     string: "string",
     *     boolean: "boolean",
     *     number: "number",
     *     bigint: "bigint",
     *     array: "array",
     *     symbol: "symbol",
     *     fn: "function"
     * });
     * @returns {Promise} - Returns a Promise on second usage.
     */
    constructor(base) {
        return async(str) => {
            const promise = read(base, str);
            return Promise.resolve(promise);
        }
    }
}

function read(base, str, prevGate) {
    const use = new ObjectUtil();
    let gate;
    if(!prevGate) gate = true;

    if(use.isObject(base) && use.isObject(str)) {
        Object.keys(base).forEach(k => {
            if(!str[k]) gate = false;
            else {
                if(use.isObject(base[k]) && use.isObject(str[k]) && typeof str[k] !== 'function' && /^\s*class\s+/.test(str[k].toString())) {
                    if((read(base[k], str[k], true)) === false) gate = false;
                } else {
                    Object.values(Structures).forEach(s => {
                        if(s === "enum" && base[k] === s) {
                            if(!str[k] instanceof Enum) gate = false;
                        } else if(base[k] === s && typeof str[k] === s) {
                            // Passed!
                        } else if(base[k] !== s && typeof str[k] !== s) {
                            gate = false;
                        } else {
                            gate = false;
                        }
                    });
                }
            }
        });
    }

    return gate;
}

module.exports = { StructureUtil };