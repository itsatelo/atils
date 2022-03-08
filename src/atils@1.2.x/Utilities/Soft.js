soft_script = `const fs = require('fs');
const path = require('path');
let modules_folder;

class Soft {
    constructor(folder_name) {
        modules_folder = folder_name;

        if(fs.existsSync(\`./$\{modules_folder}\`) === false) {
            fs.mkdir(\`$\{modules_folder}\`, (err) => console.error(err));
            fs.mkdir(\`$\{modules_folder}/node_modules\`, (err) => console.error(err));

            fs.writeFileSync(\`$\{modules_folder}/soft.atils.txt\`, \`Soft is just a simple way to rename your node_modules folder.\`);
        } else {
            if(fs.existsSync(\`./$\{modules_folder}\`) === false) {
                fs.mkdir(\`$\{modules_folder}/node_modules\`, (err) => console.error(err));
                fs.writeFileSync(\`$\{modules_folder}/soft.atils.txt\`, \`Soft is just a simple way to rename your node_modules folder.\`);
            }
        }

        if(fs.existsSync('./node_modules') === true) {
            copyDir('./node_modules', \`./$\{modules_folder}/node_modules\`);
        }
    }
    request(file) {
        if(file.startsWith('.')) {
            return require(file);
        } else {
            return require(\`./$\{modules_folder}/node_modules/$\{file}\`);
        }
    }
}

function copyDir(source, destination) {
    fs.mkdirSync(destination, { recursive: true });

    fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
        let sourcePath = path.join(source, entry.name);
        let destinationPath = path.join(destination, entry.name);

        entry.isDirectory()
            ? copyDir(sourcePath, destinationPath)
            : fs.copyFileSync(sourcePath, destinationPath);
    });

    setTimeout(() => {
        fs.rmSync('./node_modules', { recursive: true, force: true });
    }, 3000);

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