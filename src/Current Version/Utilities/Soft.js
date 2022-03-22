soft_script = `const fs = require('fs');
const path = require('path');
let folderPath;
let baseModulesPath = process.cwd() + '/node_modules';

class Soft {
    /**
     * 
     * @param {Object} options - Options for Soft.
     * @param {string} [options.folderPath] - The name of the folder to be used as the new modules folder. Defaults to ./mods
     * @param {stirng} [options.modulesPath] - The location of your node_modules folder. Defaults to where you ran your script.
     */
    constructor(options) {
        this.options = Object.assign({
            folderPath: './mods',
            modulesPath: baseModulesPath,
        });

        folderPath = this.options.folderPath;
        baseModulesPath = this.options.modulesPath;

        if(fs.existsSync(folderPath) === false) {
            fs.mkdir(folderPath, (err) => console.error(err));
            if(fs.existsSync(\`$\{folderPath}/node_modules\`) === false) fs.mkdir(\`\${folderPath}/node_modules\`, (err) => console.error(err));
        }

        if(fs.existsSync(process.cwd() + "/node_modules") === true) {
            copyDirectory(\`$\{process.cwd()}/node_modules`, `$\{folderPath}/node_modules\`);
        }
    }

    request(package) {
        if(package.startsWith('.')) {
            const packageReader = package.split(/\/|\\/gi);
            let packagePath = getFilePath()[1].getFileName().split('').splice(-1);
            packageReader.forEach(item => {
                if(item === '..') {
                    packagePath.splice(-1);
                } else if(item === ".") {
                    
                } else {
                    packagePath.push(item);
                }
            });

            return require(packagePath.join('/'));
            
        } else {
            return require(\`\${folderPath}/node_modules/\${package}\`);
        }
    }

    require(package) {
        return this.request(package);
    }
}

function copyDirectory(source, destination) {
    fs.mkdirSync(destination, { recursive: true });
    fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
        let sourcePath = path.join(source, entry.name);
        let destinationPath = path.join(destination, entry.name);

        entry.isDirectory()
            ? copyDirectory(sourcePath, destinationPath)
            : fs.copyFileSync(sourcePath, destinationPath);
    });

    console.log(\`Deleting node_modules folder (it has been copied) in 3 seconds.\`);

    setTimeout(() => {
        fs.rmSync(baseModulesPath, { recursive: true, force: true });
    }, 3000);
}

function getFilePath() {
    const original = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) { return stack; };
    const Err = new Error;
    Error.captureStackTrace(Err, arguments.callee);
    const stack = Err.stack;
    Error.prepareStackTrace = original;
    return stack;
}

module.exports = Soft;`

/**
 * @class
 * @description - A simple way to rename your node_modules folder.
 * 
 * @example
 * const { Soft } = require('atils');
 * new Soft(); // this will make it go through the initialization process
 * // you can stop seeing the text by providing "true" as the first parameter
 * // new Soft(true);
 * 
 * @example
 * // rewrite index.js to look like:
 * const Soft = require('./soft.atils.js');
 * const soft = new Soft('your_folder_name_here');
 * const something = soft.request('something');
 */
class Soft {
    constructor(ignore) {
        if(ignore === false || !ignore) {
            console.log(`Thank you for using Soft!\n\n`);
            console.log(`Soft is a simple way to rename your node_modules folder into whatever you want!\n`);
            console.log(`Once this script is ran, it will exit the process and create a new file called soft.atils.js\n`);
            console.log(`Rewrite your index.js (or ts if it works?) to work with this new file, and then run the script!\n`);
            console.log(`atils will then copy your node_modules folder into your desired folder, and then will delete the original one!\n`);

            this.#startSetup();
        } else {
            this.#startSetup();
        }
    }

    #startSetup() {
        const fs = require('fs');
        fs.writeFile('./soft.atils.js', soft_script, function(err) {
            if(err) console.error(err);
            process.exit();
        });

        
    }
}

module.exports = Soft;