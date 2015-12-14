/*jslint browser: true, devel: true, node: true, ass: true, nomen: true, unparam: true, indent: 4 */

(function () {
    "use strict";

    // Vars
    var dir     = __dirname,

        ejs     = require('ejs'),
        express = require('express'),
        favicon = require('serve-favicon'),
        fs      = require('fs'),
        slash   = require('express-slash'),
        XP      = require('expandjs'),
        locales = require(dir + '/locales'),
        schema  = require(dir + '/schema'),

        app      = express(),
        domain   = '',
        port     = '3000',
        protocol = 'http',
        router   = express.Router({caseSensitive: true, strict: true}),
        routes   = {};

    /***********************************************************************/
    /* ROUTES */
    /***********************************************************************/

    // Main
    routes.error    = function (req, res) { res.status(404); res.render('404', {url: req.url}); };
    routes.redirect = function (req, res) { if (domain && req.hostname === 'www.' + domain) { res.redirect(301, protocol + '://' + domain + '/' + XP.trim(req.url, '/')); } else if (req.url.length > 1 && XP.endsWith(req.url, '/')) { res.redirect(XP.trimRight(req.url, '/')); } else { this(req, res); } };

    // Others
    routes.schema  = routes.redirect.bind(function (req, res) { res.jsonp(schema); });
    routes.cookies = routes.redirect.bind(function (req, res) { res.render('cookies'); });
    routes.index   = routes.redirect.bind(function (req, res) { res.render('index', {dev: app.get('development')}); });
    routes.partial = routes.redirect.bind(function (req, res) { res.render('partial/' + req.params.name, {}, function (error, html) { return error ? routes.error(req, res) : res.end(html); }); });

    /***********************************************************************/
    /* APP */
    /***********************************************************************/

    // Settings
    app.set('case sensitive routing', true);
    app.set('development', app.get('env') === 'development');
    app.set('strict routing', true);
    app.set('view engine', 'html');
    app.set('views', dir + '/views');

    // Engine
    app.engine('html', ejs.renderFile);

    // Static (development)
    if (app.get('development')) { app.use('/bower_components', express.static(dir + '/../bower_components')); }
    if (app.get('development')) { app.use('/bower_components', express.static(dir + '/../node_modules')); }

    // Static (favicon)
    if (fs.existsSync(dir + '/static/favicon.png')) { app.use(favicon(dir + '/static/favicon.png')); }

    // Static (production)
    app.use(express.static(dir + '/static'));
    app.use('/bower_components', express.static(dir + '/bower_components'));
    app.use('/components', express.static(dir + '/components'));

    // Middleware
    app.use(router);
    app.use(slash());

    // Localizing
    XP.forOwn(locales, function (json, lang) { router.get('/locales/' + lang, function (req, res) { res.jsonp(json); }); });

    // Routing
    router.get('/', routes.index);
    router.get('/cookies', routes.cookies);
    router.get('/partial/:name', routes.partial);
    router.get('/schema', routes.schema);
    router.get('/*', routes.error);

    // Listening
    app.listen(port, function () { console.log('App listening on port ' + port); });

}());
