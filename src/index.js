const { Collection } = require('./Utils/CollectionUtil.js');
const { log } = require('./Utils/ConsoleUtil.js');
const { ErrorManager, RawErrorManager } = require('./Utils/ErrorUtil.js');
const { MergeUtility, RawMergeUtility } = require('./Utils/MergeUtil.js');
const { DateUtil } = require('./Utils/DateUtil.js');

const { ExcessiveError } = require('./Utils/Presets/Errors.js');

// Exports for CollectionUtil
exports.CollectionUtil = Collection;
exports.Collection = Collection;
exports.Coll = Collection;

// Exports for ConsoleUtil
exports.ConsoleUtil = log;
exports.Console = log;
exports.log = log;

// Exports for ErrorUtil
exports.ErrorUtil = ErrorManager;
exports.ErrorManager = ErrorManager;
exports.error = ErrorManager;
exports.RawErrorManager = RawErrorManager;

// Exports for MergeUtil
exports.MergeUtil = MergeUtility;
exports.Classes = MergeUtility;
exports.RawMergeUtil = RawMergeUtility;

// Exports for DateUtil
exports.DateUtil = DateUtil;
exports.date = DateUtil;

// Exports for Preset Errors
exports.Errors = {
    ExcessiveError: ExcessiveError,
};
exports.ExcessiveError = ExcessiveError;

// JSDOC
// jsdoc -c src/jsdoc.json -t ./node_modules/ink-docstrap/template -R src/README.md -r .
