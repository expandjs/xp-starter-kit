// Const
const config = require('../config');

/*********************************************************************/

// Exporting
module.exports = require(`./${config.platform}`);
