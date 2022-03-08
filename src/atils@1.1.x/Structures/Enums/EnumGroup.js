const { Enum, EnumStructure } = require('./Enum.js');

/**
 * @class
 * @version 1.0.0
 * @description - A Group of [Enums]{@link Enum}.
 */
class EnumGroup {
    #enums;
    /**
     * Constructor method for EnumGroup
     * @param {string} name - The name of the EnumGroup.
     * @param  {...Object} enums - All Objects to be created as Enums.
     * @param {...Object.string} enums.name - The name of the specific Enum.
     * @param {...Object.*} enums.value - The value of the specific Enum.
     * @param {...Object.Array.<*>} enums.params - The params to be saved with the Enum value.
     */
    constructor(name, ...enums) {
        this.$ENUM_GROUP_NAME = name;
        this.#enums = [...enums];
        this.#enums.forEach(i => {
            if(EnumStructure(i) === true) {
                this[i.name] = new Enum(i.value, { resolveable: true, group: this.$ENUM_GROUP_NAME }, i.params ?? []);
            }
        });

        Object.freeze(this);
    }
}

module.exports = { EnumGroup, Enum, EnumStructure };