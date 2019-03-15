'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1546864628068_362';

    // add your config here
    config.middleware = [];

    config.view = {
        // cache: false,
        // root: [
        //     path.join(appInfo.baseDir, 'app/view'),
        //     path.join(appInfo.baseDir, ''),
        // ].join(','),
        defaultExtension: '.nj',
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks'
        }
    };

    config.themePath = '';

    config.security = {
        csrf: {
            enable: false,
        }
    };

    config.manifest = {
        default: path.join(appInfo.baseDir, '/app/public/assets/manifest.json')
    };

    return config;
};
