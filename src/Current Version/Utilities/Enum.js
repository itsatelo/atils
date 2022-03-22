const RawEnum = require('../Bases/RawEnum.js');
const RawError = require('../Bases/RawError.js');

/**
 * @class
 * @description - Basic Enum Utility. Uses [Raw Enums]{@link RawEnum}.
 * 
 * @example
 * const { Enum } = require('atils');
 * const exampleEnum = new Enum({
 *   resolver: {
 *     text: "hello world",
 *   }
 * });
 * 
 * console.log(exampleEnum.resolveResolver('text'));
 * // Console Output:
 * // hello world
 */
class Enum {
    #enums;
    /**
     * Constructor method for Enums.
     * @param {Object} enumInfo - The information for your resolvers, and your Enums.
     *   @param {Object} [enumInfo.EXAMPLE_RESOLVER] - An example of a Resolver.
     *     @param {*} [enumInfo.EXAMPLE_RESOLVER.EXAMPLE_KEY] - An example of a Key.
     *   @param {Object} [enumInfo.EXAMPLE_RESOLVER_2] - Another example of a Resolver.
     *     @param {*} [enumInfo.EXAMPLE_RESOLVER_2.EXAMPLE_KEY_2] - Another example of a Key.
     */
    constructor(enumInfo) {
        if(typeof enumInfo !== "object" || Array.isArray(enumInfo) || enumInfo === null) {
            throw new RawError("Enum Management Error (EM-F.001)", `Cannot create RawEnum off of non-Object items.`);
        }

        this.#enums = {};
        Object.entries(enumInfo).forEach(entry => {
            const resolverName = entry[0].charAt(0).toUpperCase() + entry[0].slice(1);
            this.#enums[resolverName] = new RawEnum(resolverName, entry[1]);

            /**
             * Resolver method for the Enum.
             * @param {string} keyToResolve - The key to resolve within the Enum.
             * @returns {*} - The value of the resolved Enum, or the reason it failed to resolve.
             */
            this[`resolve${resolverName}`] = function(keyToResolve) {
                const resolved = this.#enums[resolverName].resolve(keyToResolve);
                if(resolved.Success === true) return resolved.Data.value
                else return {
                        success: resolved.Success,
                        reason: resolved.Reason,
                        data: {},
                    };
            }

            /**
             * Returns all key-value pairs within an entire resolver.
             * @param {string} resolverNameToResolve - The name of the Resolver.
             * @returns {Object} - An Object containing the key-value pairs within the Raw Enum.
             */
            this[`resolve`] = function(resolverNameToResolve) {
                if(resolverNameToResolve === "atils -enum-all get_all_values") {
                    const enums = [];
                    Object.values(this.#enums).forEach(value => {
                        const vals = value.getAllValues();
                        enums.push(vals);
                    });

                    return enums;
                } else {
                    const resName = resolverNameToResolve.charAt(0).toUpperCase() + resolverNameToResolve.slice(1);
                    if(!this.#enums[resName]) return undefined;
                    const resolved = this.#enums[resName].getAllValues();
                    return resolved.Values;
                }
            }
        });

        Object.freeze(this);
    }
}

module.exports = Enum;