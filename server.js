/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
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
    production = fs.find('./production.on.html'),
    views      = fs.export('./views', 'html', ejs.compile);

/***********************************************************************/
/* ROUTER */
/***********************************************************************/

// Let
let router = Router({caseSensitive: true, strict: true});

// Routing
router.get('/cookies', (req, res) => new Responder({data: views.cookies(), mode: 'html', response: res}).send());
config.routes.forEach(route => router.get(route, (req, res) => new Responder({data: views.index(), mode: 'html', response: res}).send()));

// Production
if (production) { router.use('/', Static('./build/unbundled')); }

// Development
router.use('/bower_components', Static('../bower_components'));
router.use('/bower_components', Static('../node_modules'));
router.use('/bower_components', Static('./bower_components'));
router.use('/src', Static('./src'));

// Fallback
router.get('/service-worker.js', (req, res) => new Responder({data: '', mode: 'js', response: res}).send());
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
