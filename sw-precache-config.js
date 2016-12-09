module.exports = {

    runtimeCaching: [
        {
            handler: 'networkFirst',
            urlPattern: /.*/,
            options: {
                cache: {
                    maxEntries: 300,
                    name: 'cache'
                }
            }
        }
    ],

    staticFileGlobs: [
        '/bower_components/webcomponentsjs/webcomponents.js',
        '/src/manifest.json'
    ]
};
