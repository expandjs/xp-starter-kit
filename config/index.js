// Exporting
module.exports = {

    // Environment
    environment: process.env.NODE_ENV,

    // Platform
    platform: process.env.NODE_PLT
};

/*********************************************************************/

// Overriding
Object.assign(module.exports, require('xp-fs').export(__dirname));
