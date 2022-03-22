const RawError = require("./RawError");

/**
 * @class
 * @description - A Raw Enum that utilizes it's own Resolver.
 * @deprecated - Use [Enums]{@link Enum}, not Raw Enums.
 * 
 * @example
 * const { RawEnum } = require('atils');
 * const exampleEnum = new RawEnum('testingEnum', { text: "hello world" });
 * 
 * console.log(exampleEnum.resolve("text"));
 * // Console Output:
 * // hello world
 */
class RawEnum {
    #name;
    #values;
    /**
     * Constructor method for Raw Enums.
     * @param {string} resolverName - The Resolver Name for this Raw Enum instance.
     * @param {Object} rawEnumInfo - The information for the Raw Enum instance.
     *   @param {Object} [rawEnumInfo.YOUR_RESOLVER_NAME] - Creates a new Resolver with the items within. Replace "YOUR_RESOLVER_NAME" with whatever you want.
     *     @param {*} [rawEnumInfo.YOUR_RESOLVER_NAME.YOUR_KEY_NAME] - Creates a new Key Value Pair within this Resolver. Replace "YOUR_RESOLVER_NAME" and "YOUR_KEY_NAME" with whatever you want.
     *   @param {Object} [rawEnumInfo.YOUR_SECOND_RESOLVER] - Creates a new Resolver with the items within. Replace "YOUR_SECOND_RESOLVER" with whatever you want.
     *     @param {*} [rawEnumInfo.YOUR_SECOND_RESOLVER.YOUR_SECOND_KEY_NAME] - Creates a new Key Value Pair within this Resolver. Replace "YOUR_SECOND_RESOLVER" and "YOUR_SECOND_KEY_NAME" with whatever you want.
     */
    constructor(resolverName, rawEnumInfo) {
        if(typeof resolverName !== "string") {
            throw new RawError("RawEnum Management Error (REM-F.002)", "Cannot use non-String items for Names.");
        }

        if(typeof rawEnumInfo !== "object" || Array.isArray(rawEnumInfo) || rawEnumInfo === null) {
            throw new RawError("RawEnum Management Error (REM-F.003)", "Cannot use non-Object items for Enums.");
        }

        this.#name = resolverName;
        this.#values = rawEnumInfo;

        Object.freeze(this);
    }

    /**
     * Resolves a Key within this Raw Enum.
     * @param {string} key - The key to resolve within this Raw Enum.
     * @returns {*} - The value of the specified Key.
     * 
     * @example
     * console.log(exampleEnum.resolve("text"));
     * // Console Output:
     * // hello world
     */
    resolve(key) {
        if(typeof key !== "string") {
            return {
                Success: false,
                Reason: "Unable to resolve non-String character as Key.",
                Data : {
                    value: undefined,
                }
            }
        }

        if(this.#values[key]) return {
            Success: true,
            Reason: undefined,
            Data: {
                value: this.#values[key],
            }
        }
        
        else return {
            Success: true,
            Reason: undefined,
            Data: {
                value: undefined,
            }
        };
    }

    /**
     * Obtains and returns all values within the Raw Enum.
     * @returns {Object} - The name of the Raw Enum, as well as all of the Values.
     */
    getAllValues() {
        return {
            Enum_Name: this.#name ?? "Undefined Enum",
            Values: this.#values ?? {},
        }
    }
}

module.exports = RawEnum;