'use strict';

module.exports = () => {
    const config = exports = {};

    config.security = {
        csrf: {
            enable: false,
        }
    };
    
    config.sequelize = {
        dialect: 'mysql',
        database: 'sparrow_dev',
        host: '47.104.77.73',
        port: 3306,
        username: 'sparrow_dev',
        password: 'sparrow_dev',
    };

    config.development = {
        // watchDirs: [ 'node_modules/koa-static-cache',],
    };

    return config;
};
