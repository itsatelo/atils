const { CollectionUtility } = require('./Utilities/Collection.js');
const { ConsoleUtility } = require('./Utilities/Console.js');
const { DateUtility } = require('./Utilities/Date.js');
const { ErrorUtility } = require('./Utilities/Error.js');
const { MergeUtility } = require('./Utilities/Merge.js');
const { ObjectUtility } = require('./Utilities/Object.js');
const { RequestUtility, CollectionRequestUtility } = require('./Utilities/Request.js');

exports = {
    Collection: CollectionUtility,
    CollectionUtility: CollectionUtility,

    Console: ConsoleUtility,
    ConsoleUtility: ConsoleUtility,

    Date: DateUtility,
    DateUtility: DateUtility,

    Error: ErrorUtility,
    ErrorUtility: ErrorUtility,

    Merge: MergeUtility,
    MergeUtility: MergeUtility,

    Object: ObjectUtility,
    ObjectUtility: ObjectUtility,

    Request: RequestUtility,
    RequestUtility: RequestUtility,
    RequestCollection: CollectionRequestUtility,
    CollectionRequestUtility: CollectionRequestUtility,
};

// jsdoc -c jsdoc.json -t ../node_modules/ink-docstrap/template -R .//README.md -r .