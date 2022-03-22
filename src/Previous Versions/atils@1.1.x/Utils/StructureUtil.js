const { Enum } = require('../Structures/Enums/Enum.js');
const { EnumGroup } = require('../Structures/Enums/EnumGroup.js');
const { EnumClient } = require('./EnumUtil.js');
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
    ENUM_GROUP: "enum group",
    ENUM_CLIENT: "enum client",
    ANY: "any",
}

/**
 * @class
 * @version v1.0.0
 * @description - Defines structures in a simpler manner.
 */
class StructureUtil {
    #structure;
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
     *     fn: "function",
     *     enum: "enum",
     *     enum_group: "enum group",
     *     enum_client: "enum client",
     *     any: "any",
     * });
     * @returns {Promise} - Returns a Promise on second usage.
     */
    constructor(base) {
        this.structure = base;
        this.#structure = base;
    }

    /**
     * Determines if the provided Object matches this Structure.
     * @param {Object} structure - Whether the provided Object matches this Structure.
     * @returns {Boolean}
     */
    is(structure) {
        const is = read(this.structure, structure);
        return is;
    }

    /**
     * Modifies the current Structure.
     * @param {Object} toAdd - What to add to this Structure.
     */
    modify(toAdd) {
        this.structure = Object.assign(this.structure, toAdd);
    }

    /**
     * Returns a new iteration of the original Structure.
     * @returns {StructureUtil} - The original variation.
     */
    base() {
        return new this.constructor(this.#structure);
    }

    /**
     * Seals the Structure.
     */
    seal() {
        Object.seal(this.structure);
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
                        } else if(s === "enum group" && base[k] === s) {
                            if(!str[k] instanceof EnumGroup) gate = false;
                        } else if(s === "enum client" && base[k] === s) {
                            if(!str[k] instanceof EnumClient) gate = false;
                        } else if(base[k] === s && typeof str[k] === s) {
                            // Passed!
                        } else if(base[k] === s && typeof str[k] !== s) {
                            gate = false;
                        } else if(!Object.values(Structures).includes(base[k])) { 
                            gate = false;
                        } else if(s === "any" && base[k] === s) {
                            
                        }
                    });
                }
            }
        });
    }

    return gate;
}

module.exports = { StructureUtil };