/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(`${__dirname}/..`);
process.env.NODE_ENV = 'development';
process.env.NODE_PLT = process.env.NODE_PLT === 'local' ? process.env.NODE_PLT : 'cloud';

/*********************************************************************/
/* LET */
/*********************************************************************/
let Process = require('child_process'),
    XP      = require('expandjs');

/*********************************************************************/
/* CODE */
/*********************************************************************/

// Waterfall
XP.waterfall([
    next => next(console.log(`BUILD: started`)), // logging
    next => Process.exec(`node scripts/buildPolymer`, next).stdout.pipe(process.stdout) // building polymer
], error => {

    // Logging
    console.log(`BUILD: ${error ? `failed` : `complete`}`);

    // Reporting
    if (error) { console.error(error); }

    // Exiting
    process.exit(error ? 1 : 0);
});
