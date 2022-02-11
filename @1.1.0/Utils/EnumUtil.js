const { Enum, EnumGroup, EnumStructure } = require('../Structures/Enums/EnumGroup.js');

/**
 * @class
 * @version 1.0.0
 * @description - Creates a new EnumManager to manage groups of Enums.
 */
class EnumManager {
    constructor() {}

    /**
     * Creates a new {@link EnumGroup} to store Enums.
     * @param {string} name - The name of the [EnumGroup]{@link EnumGroup}
     * @param  {...Object} enumObjects - Objects of information that can be processed into an [Enum]{@link Enum}.
     */
    createGroup(name, ...enumObjects) {
        this[name] = new EnumGroup(name, ...enumObjects);
    }

    /**
     * Deletes an EnumGroup from the Manager.
     * @param {string} name - The name of the EnumGroup you would like to delete.
     */
    deleteGroup(name) {
        this[name] = undefined;
    }

    /**
     * Obtains an EnumGroup and returns it to the client.
     * @param {string} name - The name of the EnumGroup.
     * @returns {EnumGroup} - The requested EnumGroup.
     */
    getGroup(name) {
        return this[name];
    }

    /**
     * Looks through all EnumGroups for the first Enum with the specified name.
     * @param {string} name - The name of the Enum.
     * @returns {Object} - The resolved Enum. 
     */
    resolve(name) {
        let found;
        Object.entries(this).forEach(entry => {
            if(this[entry[0]]) {
                if(food) return;
                if(this[entry[0]][name]) {
                    found = this[entry[0]][name].resolve();
                }
            }
        });

        return found;
    }

    /**
     * Loks through all EnumGroups for any Enum with the specified name.
     * @param {string} name - The name of the Enum.
     * @returns {Array.<Object>} - An Array of Resolved Enums.
     */
    resolveFromAllGroups(name) {
        const found = [];
        Object.entries(this).forEach(entry => {
            if(this[entry[0]]) {
                if(this[entry[0]][name]) {
                    found.push(this[entry[0]][name].resolve());
                }
            }
        });

        return found;
    }

    /**
     * Searches for an Enum to return.
     * @param {string} name - The name of the Enum.
     * @returns {Enum} - The Enum.
     */
    search(name) {
        const found = [];
        Object.entries(this).forEach(entry => {
            if(this[entry[0]]) {
                if(this[entry[0]][name]) {
                    found.push(this[entry[0]][name]);
                }
            }
        });

        return found[0];
    }
}

module.exports = { EnumManager };