/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(__dirname);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/*********************************************************************/
/* CONST */
/*********************************************************************/
const ejs      = require('ejs'),
    finalizer  = require('finalhandler'),
    fs         = require('xp-fs'),
    https      = require('http2'),
    Responder  = require('xp-responder'),
    Router     = require('router'),
    Static     = require('serve-static'),
    XP         = require('expandjs'),
    config     = require('./config'),
    tls        = require('./tls'),
    production = process.argv.includes('--production') || process.argv.includes('-p'),
    views      = fs.export(`${__dirname}/views`, 'html', ejs.compile);

/***********************************************************************/
/* ROUTER */
/***********************************************************************/

// Let
let router = Router({caseSensitive: true, strict: true});

// Static (production)
if (production) { router.use('/', Static(`${__dirname}/build/unbundled`)); }

// Static (development)
router.use('/bower_components', Static(`${__dirname}./bower_components`));
router.use('/bower_components', Static(`${__dirname}./node_modules`));
router.use('/bower_components', Static(`${__dirname}/bower_components`));
router.get('/service-worker.js', (req, res) => new Responder({data: '', mode: 'js', response: res}).send());
router.use('/src', Static(`${__dirname}/src`));

// Routing
router.get('/cookies', (req, res) => new Responder({data: views.cookies(), mode: 'html', response: res}).send());
config.routes.forEach(route => router.get(route, (req, res) => new Responder({data: views.index(), mode: 'html', response: res}).send()));

// Fallback
router.use((req, res) => new Responder({error: XP.error(404), mode: 'html', response: res}).send());

/*********************************************************************/
/* SERVER */
/*********************************************************************/

// Let
let server = https.createServer({cert: tls.cert, key: tls.key});

// Handling
server.on('request', (req, res) => router(req, res, finalizer(req, res)));

// Listening
server.listen(config.port, error => console.log(error || `API listening on port ${config.port}`));
