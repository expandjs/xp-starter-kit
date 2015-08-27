/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var dir     = __dirname,
        ejs     = require('ejs'),
        express = require('express'),
        favicon = require('serve-favicon'),
        fs      = require('fs'),
        http    = require('http'),
        slash   = require('express-slash'),
        XP      = require('expandjs'),
        locales = require(dir + '/locales'),
        schema  = require(dir + '/schema'),
        app     = {domain: '', init: express(), port: 3000, protocol: 'http'},
        dev     = app.init.get('env') === 'development',
        router  = express.Router({caseSensitive: true, strict: true}),
        routes  = {};

    /***********************************************************************/
    /* ROUTES */
    /***********************************************************************/

    // Main
    routes.error    = function (req, res) { res.status(404); res.render('404', {url: req.url}); };
    routes.redirect = function (req, res) { if (app.domain && req.hostname === 'www.' + app.domain) { res.redirect(301, app.protocol + '://' + app.domain + '/' + XP.trim(req.url, '/')); } else if (req.url.length > 1 && XP.endsWith(req.url, '/')) { res.redirect(XP.trimRight(req.url, '/')); } else { this(req, res); } };

    // Others
    routes.schema  = routes.redirect.bind(function (req, res) { res.jsonp(schema); });
    routes.cookies = routes.redirect.bind(function (req, res) { res.render('cookies'); });
    routes.index   = routes.redirect.bind(function (req, res) { res.render('index', {dev: dev}); });
    routes.partial = routes.redirect.bind(function (req, res) { res.render('partial/' + req.params.name, {}, function (error, html) { return error ? routes.error(req, res) : res.end(html); }); });

    /***********************************************************************/
    /* APP */
    /***********************************************************************/

    // Settings
    app.init.set('case sensitive routing', true);
    app.init.set('strict routing', true);
    app.init.set('view engine', 'html');
    app.init.set('views', dir + '/views');

    // Engine
    app.init.engine('html', ejs.renderFile);

    // Statics (development)
    if (dev) { app.init.use('/bower_components', express.static(dir + '/../bower_components')); }
    if (dev) { app.init.use('/bower_components', express.static(dir + '/../node_modules')); }
    if (dev) { app.init.use('/components', express.static(dir + '/components')); }

    // Statics (favicon)
    if (fs.existsSync(dir + '/static/icons/favicon.png')) { app.init.use(favicon(dir + '/static/icons/favicon.png')); }

    // Statics (production)
    app.init.use(express.static(dir + '/static'));
    app.init.use('/bower_components', express.static(dir + '/bower_components'));

    // Middleware
    app.init.use(router);
    app.init.use(slash());

    // Localizing
    XP.forOwn(locales, function (json, lang) { router.get('/locales/' + lang, function (req, res) { res.jsonp(json); }); });

    // Routing
    router.get('/', routes.index);
    router.get('/cookies', routes.cookies);
    router.get('/partial/:name', routes.partial);
    router.get('/schema', routes.schema);
    router.get('/*', routes.error);

    // Initializing
    app.server = http.createServer(app.init);

    // Listening
    app.server.listen(app.port, function () { console.log('App listening on port ' + app.port); });

}());
