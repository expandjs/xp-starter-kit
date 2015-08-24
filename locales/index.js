/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var fs = require('xp-fs');

    /*********************************************************************/

    // Exporting
    module.exports = fs.exportSync(__dirname);

}());