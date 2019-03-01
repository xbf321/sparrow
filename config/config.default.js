

const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1546864628068_362';

    // add your config here
    config.middleware = [];

    // config.view = {
    //     defaultViewEngine: 'nunjucks',
    //     mapping: {
    //         '.nj': 'nunjucks'
    //     }
    // };

    // config.manifest = {
    //     default: path.join(appInfo.baseDir, '/app/public/manifest.json')
    // };

    return config;
};
