/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(`${__dirname}/..`);
process.env.NODE_ENV = 'development';
process.env.NODE_PLT = process.env.NODE_PLT === 'local' ? process.env.NODE_PLT : 'cloud';

/*********************************************************************/
/* LET */
/*********************************************************************/
let Process = require('child_process');

/*********************************************************************/
/* CODE */
/*********************************************************************/

// Building
Process.exec(`polymer build`, error => {

    // Logging
    console.log(`BUILD POLYMER: ${error ? `failed` : `complete`}`);

    // Reporting
    if (error) { console.error(error); }

    // Exiting
    process.exit(error ? 1 : 0);
});
