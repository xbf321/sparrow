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
        database: 'sparrow',
        host: '47.104.77.73',
        port: 3306,
        username: 'sparrow',
        password: 'sparrow',
    };

    return config;
};
