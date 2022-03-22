const v1_1_x = require('./Previous Versions/atils@1.1.x/Exports.js');
const v1_2_x = require('./Current Version/Exports.js');
const v1_2_x_dev = require('./Previous Versions/atils@1.2.x (Concept Build)/Exports.js');

const v10x = ['v1.0.9-stable', 'v1.0.9', 'v1.0.9-unstable', 'v1.0.8', 'v1.0.7', 'v1.0.6', 'v1.0.5', 'v1.0.4', 'v1.0.3', 'v1.0.2', 'v1.0.1', 'v1.0.0', '1.0.9-stable', '1.0.9', '1.0.9-unstable', '1.0.8', '1.0.7', '1.0.6', '1.0.5', '1.0.4', '1.0.3', '1.0.2', '1.0.1', '1.0.0', '1.0.x', 'v1.0.x', 'v1.x.x'];
const v11x = ['v1.1.4', 'v1.1.3', 'v1.1.2', 'v1.1.1', 'v1.1.0-build', 'v1.1.0', 'v1.1.x', 'v1.1', '1.1.4', '1.1.3', '1.1.2', '1.1.1', '1.1.0-build', '1.1.0', '1.1.x', '1.1'];
const v12x = ['v1.2.0', 'v1.2.x', '1.2.0', '1.2.x'];

const v12xdev = ['v1.2.x-dev', '1.2.x-dev', '12xdev'];

/**
 * Returns through time to a previous final draft of an atils version.
 * @param {string} version - The version of atils you would like to go back to.
 */
function History(version) {
    if(v10x.includes(version)) {
        console.log(`ATILS: This version is not supported by atils' version manager.`);
    } else if(v11x.includes(version)) {
        return v1_1_x;
    } else if(v12x.includes(version)) {
        return v1_2_x;
    } else if(v12xdev.includes(version)) {
        return v1_2_x_dev;
    }
}

module.exports = {
    v11x: v1_1_x,
    v12x: v1_2_x,
    v12x_dev: v1_2_x_dev,
    History,
}