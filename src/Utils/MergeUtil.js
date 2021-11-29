const { ExcessiveError } = require('./Presets/Errors.js');
const { ErrorManager, MergeUtilityError } = require('./ErrorUtil.js');

/**
 * The raw instance of the MergeUtility.
 * @param {Object[]} MergeArray - The array of Classes to be merged.
 * @param {Object} Options - The options provided for the MergeUtility.
 *  @param {number} [Options.Version=102] - The version of the MergeUtility.
 */
function RawMergeUtility (MergeArray, Options) {
    if(!Array.isArray(MergeArray)) {
        throw new MergeUtilityError(`Provided MergeArray was not an array.`);
    }

    if(!Options) {
        throw new MergeUtilityError("Options not provided.");
    }

    if(Options.Version === 102) {
        class VesselClass {
            constructor(ParamsArray) {
                if(ParamsArray && !Array.isArray(ParamsArray)) {
                    throw new MergeUtilityError("Parameters must be within an array to divide them to the correct classes.");
                }

                if(MergeArray.length > 10) {
                    throw new MergeUtilityError("The MergeUtility can only have up to 10 classes.");
                }

                MergeArray.forEach(parentClass => {
                    if(Array.isArray(ParamsArray[MergeArray.indexOf(parentClass)])) {
                        
                    

                        Object.assign(this, new parentClass(
                            ParamsArray[MergeArray.indexOf(parentClass)][0],
                            ParamsArray[MergeArray.indexOf(parentClass)][1],
                            ParamsArray[MergeArray.indexOf(parentClass)][2],
                            ParamsArray[MergeArray.indexOf(parentClass)][3],
                            ParamsArray[MergeArray.indexOf(parentClass)][4],
                            ParamsArray[MergeArray.indexOf(parentClass)][5],
                            ParamsArray[MergeArray.indexOf(parentClass)][6],
                            ParamsArray[MergeArray.indexOf(parentClass)][7],
                            ParamsArray[MergeArray.indexOf(parentClass)][8],
                            ParamsArray[MergeArray.indexOf(parentClass)][9]
                        ));
                    } else {
                        Object.assign(this, new parentClass(ParamsArray[MergeArray.indexOf(parentClass)]));
                    }
                });
            }
        }

        MergeArray.forEach(parentClass => {
            if(parentClass === undefined) return;
            Object.getOwnPropertyNames(parentClass.prototype)
                .filter(property => property != "constructor")
                .map(property => {
                    VesselClass.prototype[property] = parentClass.prototype[property];
                });
        });

        return VesselClass;
    } else {
        throw new MergeUtilityError("Attempting to access unreleased MergeUtility version.");
    }
}

/**
 * The simpler version of the raw MergeUtility.
 * @param {*} ClassOne - Either an array of Classes or the first provided class.
 * @param {*} ClassTwo - The second provided class to merge.
 * @param {*} ClassThree - The third provided class to merge.
 * @param {*} ClassFour - The fourth provided class to merge.
 * @param {*} ClassFive - The fifth provided class to merge.
 */
function MergeUtility (ClassOne, ClassTwo, ClassThree, ClassFour, ClassFive) {
    if(!Array.isArray(ClassOne)) {
        const MergeArray = [];
        if(ClassOne !== undefined) MergeArray.push(ClassOne);
        if(ClassTwo !== undefined) MergeArray.push(ClassTwo);
        if(ClassThree !== undefined) MergeArray.push(ClassThree);
        if(ClassFour !== undefined) MergeArray.push(ClassFour);
        if(ClassFive !== undefined) MergeArray.push(ClassFive);
        return RawMergeUtility(MergeArray, { Version: 102 });
    } else {
        return RawMergeUtility(ClassOne, { Version: 102 });
    }
}

module.exports = { RawMergeUtility, MergeUtility };