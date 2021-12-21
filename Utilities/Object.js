const { ErrorUtility } = require('./Error.js');
const { CollectionUtility } = require('./Collection.js');

/**
 * @class
 * @description A simplistic Object modifier that can be used with [Collections]{@link CollectionUtility}
 */
class ObjectUtility {
    /**
     * @constructor
     * @description Sets the modifiable object.
     * @param {Object} object The object being modified
     */
    constructor(object) {
        this.object = object;
    }

    /**
     * @description Gets the Object after its modifications.
     * @returns {Object} The Object after modifications.
     */
    get() {
        return this.object;
    }

    /**
     * @description Disassembles the Object into two Arrays, which are put into an Object.
     * @returns {Object} An object containing the Keys and Values of the previous Object.
     */
    disassemble() {
        if (!typeof this.object === "object" || Array.isArray(this.object) || this.object === null) throw new ErrorUtility("ObjectDisassemblyError", "Unable to disassemble what isn't an Object.");
        const Keys = [];
        const Values = [];

        Object.keys(this.object).forEach(key => {
            Keys.push(key);
        });

        Object.values(this.object).forEach(value => {
            Values.push(value);
        });

        return { keys: Keys, values: Values };
    }

    /**
     * @description Makes a Collection based around the Object.
     * @returns {*} A Collection Instance of the Object.
     */
    collection() {
        if (!typeof this.object === "object" || Array.isArray(this.object) || this.object === null) throw new ErrorUtility("ObjectDisassemblyError", "Unable to disassemble what isn't an Object.");
        const returns = new CollectionUtility();
        const dis = this.disassemble();

        dis.keys.forEach(key => {
            returns.set(`${key}`, dis.values[dis.keys.indexOf(key)]);
        });

        returns.cache();

        return returns;
    }

    /**
     * Adds items from a Collection into the Object.
     * @param {*} collection - Allows to add all key-value pairs into an Object using [Collection#objectify()]{@link CollectionUtility.objectify}
     */
    addFromCollection(collection) {
        if (collection instanceof CollectionUtility) {
            Object.assign(this.object, collection.objectify());
        } else throw new ErrorUtility("ObjectCollectionError", "Provided Collection was not a Collection.");
    }
}



module.exports = { ObjectUtility };