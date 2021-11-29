class ConsoleBuilder {
    constructor() {}
    build(name, message, info) {
        const Keys = [];
        const Values = [];

        const Finished = [];

        Object.keys(info).forEach(function(key, index) {
            Keys.push(key);
        });

        Object.values(info).forEach(function(value, index) {
            Values.push(value);
        });

        Keys.forEach(key => {
            const index = Keys.indexOf(key);
            Finished.push(`\x1b[33m${key}\x1b[0m: \x1b[35m${Values[index]}`);
        });

        return `\x1b[36m${name}\x1b[0m ${message}:\n   ${Finished.join('\n   ')}\x1b[0m`;
    }
}

function log(name, message, info) {
    console.log(new ConsoleBuilder().build(name, message, info));
}

module.exports = { log };