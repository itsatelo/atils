soft_script = `const fs = require('fs');
const path = require('path');
let modules_folder;

module.exports = class {
    constructor(folder) {
        modules_folder = folder;
        if(fs.existsSync(\`./$\{modules_folder}\`) === false) {
            fs.mkdir(\`./$\{modules_folder}\`, (err) => console.error(err));
            fs.mkdir(\`./$\{modules_folder}/node_modules\`, (err) => console.error(err));

            fs.writeFileSync(\`./$\{modules_folder}/soft.txt\`, \`Soft is a simple way to "rename" your node_modules folder. Just makes things look nicer.\`);
        }

        if(fs.existsSync('./node_modules') === true) {
            copyDir('./node_modules', \`./$\{modules_folder}/node_modules\`);
        }
    }

    req(file) {
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
    
}`

/**
 * @class
 * @description - Setup class for Soft. See GitHub for example usage.
 */
class SoftSetup {
    constructor() {
        console.log("Thank you for using Soft! This class will create a file called soft.js, and that is where your new package manager will be.");
        this.fs = require('fs');

        console.log(soft_script);

        this.fs.writeFile('./soft.js', soft_script, function(err) {
            if(err) console.log(err);
        });
    }
}

module.exports = { SoftSetup };