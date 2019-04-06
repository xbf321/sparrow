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
        host: 'localhost',
        port: 3306,
        username: 'web_sparrow',
        password: 'aBOQYAo7w',
    };

    return config;
};
