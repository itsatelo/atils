const current = require('./@1.1.1/Exports.js');

exports.ConsoleStyles = current.ConsoleStyles;

exports.Enum = current.Enum;
exports.EnumGroup = current.EnumGroup;
exports.EnumUtil = current.EnumManager;
exports.EnumUtility = current.EnumManager;
exports.EnumManager = current.EnumManager;

exports.Error = current.ErrorBuilder;
exports.ErrorUtil = current.ErrorBuilder;
exports.ErrorUtility = current.ErrorBuilder;
exports.BaseError = current.BaseError;

exports.Console = current.ConsoleUtil;
exports.ConsoleUtil = current.ConsoleUtil;
exports.ConsoleUtility = current.ConsoleUtil;

exports.Merge = current.MergeUtil;
exports.MergeUtil = current.MergeUtil;
exports.MergeUtility = current.MergeUtil;

exports.Object = current.ObjectUtil;
exports.ObjectUtil = current.ObjectUtil;
exports. ObjectUtility = current.ObjectUtil;

exports.Structure = current.StructureUtil;
exports.StructureUtil = current.StructureUtil;
exports.StructureUtility = current.StructureUtil;

exports.credits = function() {
    console.log(`Thanks for using Atils! If you need any help, feel free and submit an issue on GitHub and I'll try to respond!`);
};

// jsdoc -c jsdoc.json -t ./node_modules/ink-docstrap/template -R .//README.md -r . 