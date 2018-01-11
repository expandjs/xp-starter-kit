/*********************************************************************/
/* PROCESS */
/*********************************************************************/
process.chdir(__dirname);

// Environment
process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';
process.env.NODE_PLT = process.env.NODE_PLT === 'local' ? process.env.NODE_ENV : 'cloud';

/*********************************************************************/
/* CONST */
/*********************************************************************/
const finalizer = require('finalhandler'),
    http        = require('http'),
    Responder   = require('xp-responder'),
    Router      = require('router'),
    Static      = require('serve-static'),
    config      = require('./config'),
    hosts       = require('./hosts'),
    pack        = require('./package'),
    views       = require('./views');

/*********************************************************************/
/* ROUTER */
/*********************************************************************/

// Let
let router = Router({caseSensitive: true, strict: true});

// Routing (static)
router.use(`/`, Static(config.environment === `production` ? `./build/unbundled` : `./`));
router.use(`/bower_components`, Static(`./bower_components`));
router.use(`/src`, Static(`./src`));

// Routing (views)
router.get(`/cookies`, (req, res) => new Responder({data: views.cookies(), mode: `html`, response: res}).end());
config.routes.forEach(route => router.get(route, (req, res) => new Responder({data: views.index(), mode: `html`, response: res}).end()));

// Routing (fallback)
router.use((req, res) => new Responder({data: views.index(), mode: `html`, response: Object.assign(res, {statusCode: 404})}).end());

/*********************************************************************/
/* SERVER */
/*********************************************************************/

// Let
let server = http.createServer();

// Listening
server.on(`request`, (req, res) => router(req, res, finalizer(req, res)));

// Starting
server.listen(hosts.server.port, error => console[error ? `error` : `log`](error || `${pack.name} listening on port ${hosts.server.port}`));
