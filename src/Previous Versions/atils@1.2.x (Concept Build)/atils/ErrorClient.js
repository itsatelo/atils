const { ErrorClient } = require('../Utilities/Error.js');
const AtilsErrorClient = new ErrorClient({ date: true, log: true, log: false });

// Errors for the Structure Utility.
AtilsErrorClient.create('StructureError', 'Provided Structure was not an Object.');

// Errors for the Enum Utility.
AtilsErrorClient.create("EnumTypeError", "Value of Enum must be an Object (for Resolvers).");
AtilsErrorClient.create("EnumResolverError", "Provided Resolver was not an Object.");

// Errors for the Console Utility.
AtilsErrorClient.create("ConsoleError", "A required parameter is missing.");

// Errors for the API Request Utility
AtilsErrorClient.create("APIRequestError", "Provided String did not match URL type.");


module.exports = { ErrorClient: AtilsErrorClient };