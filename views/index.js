// Const
const ejs = require('ejs'),
    fs    = require('fs');

/*********************************************************************/

// Cycling files
fs.readdirSync(__dirname).forEach(file => {

    // Preventing
    if (file === `index.js`) { return; }

    // Exporting
    module.exports[file.replace(`.html`, ``)] = ejs.compile(fs.readFileSync(`${__dirname}/${file}`, `utf-8`));
});
