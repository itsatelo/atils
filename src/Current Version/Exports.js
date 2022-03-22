const RawError = require('./Bases/RawError.js');
const RawEnum = require('./Bases/RawEnum.js');

const { Style, Color, BackgroundColor, ConsoleStyles } = require('./Enums/ConsoleStyles.js');

const Console = require('./Utilities/Console.js');
const Enum = require('./Utilities/Enum.js');
const Error = require('./Utilities/Error.js');
const Merge = require('./Utilities/Merge.js');
const Soft = require('./Utilities/Soft.js');
const Structure = require('./Utilities/Structure.js');

module.exports = {
    RawError, RawEnum,
    Style, Color, BackgroundColor, ConsoleStyles,

    Console, Enum, Error, Merge, Soft, Structure
};