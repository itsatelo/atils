const { Enum } = require('./Structures/Enums/Enum.js');
const { EnumGroup } = require('./Structures/Enums/EnumGroup.js');
const { ConsoleStyles } = require('./Structures/ConsoleStyles.js');

const { ErrorBuilder, BaseError } = require('./Utils/ErrorUtil.js');
const { ConsoleUtil } = require('./Utils/ConsoleUtil.js');
const { EnumManager } = require('./Utils/EnumUtil.js');
const { MergeUtil } = require('./Utils/MergeUtil.js');
const { ObjectUtil } = require('./Utils/ObjectUtil.js');
const { StructureUtil } = require('./Utils/StructureUtil.js');

module.exports = {
    Enum, EnumGroup, ConsoleStyles, ErrorBuilder, BaseError, ConsoleUtil,
    EnumManager, MergeUtil, ObjectUtil, StructureUtil,
};