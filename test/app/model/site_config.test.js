'use strict';
const mock = require('egg-mock');
const assert = require('assert');

describe('test/app/model/site_config.test.js', () => {
    let app;
    before(() => {
        mock.env('local');
        app = mock.app();
        return app.ready();
    });

    // it('create config', async () => {
    //     const model = {
    //         key: 'limit',
    //         value: '10',
    //         desc: '每页显示条目',
    //     };
    //     const handle = app.model.SiteConfig;
    //     const config = await handle.findByKey(model.key);
    //     let result;
    //     if (config === null) {
    //         result = await handle.create(model);
    //     } else {
    //         Object.assign(config, model);
    //         result = await config.save();
    //     }
    //     assert(result.value === model.value);
    // });

    // it('findByKey', async () => {
    //     const result = await app.model.SiteConfig.findByKey('theme');
    //     assert(result !== null);
    //     assert(result.value === 'sparrow');
    // });

    // it('findAll', async () => {
    //     const result = await app.model.SiteConfig.findAll({
    //         attributes: [ 'key', 'value' ],
    //     });
    //     assert(result.length !== 0);
    // });
});
