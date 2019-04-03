'use strict';

const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    const themePath = path.join(appInfo.baseDir, 'content/themes');
    config.keys = appInfo.name + '_1546864628068_362';
    config.middleware = ['settingsHandler', 'assetHandler'];
    config.view = {
        root: [
            path.join(appInfo.baseDir, 'app/view'),
            themePath,
        ].join(','),
        defaultExtension: '.nj',
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks'
        }
    };
    config.themePath = themePath;
    config.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'app/public'),
    };

    config.manifest = {
        default: path.join(appInfo.baseDir, '/app/public/assets/manifest.json')
    };
    return config;
};
