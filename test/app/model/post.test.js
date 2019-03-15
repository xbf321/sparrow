'use strict';
const mock = require('egg-mock');
const assert = require('assert');

describe('test/app/model/post.test.js', () => {
    let app;
    before(() => {
        mock.env('local');
        app = mock.app();
        return app.ready();
    });

    // it('create post', async () => {
    //     const result = await app.model.Post.create({
    //         title: '[每周一书] 如何成为一名《卓有成效的管理者》' + Math.random(1, 10),
    //         markdown_content: 'markdown_content',
    //         content: '选 CentOS 7 或 Debian 9 系统。内存不能太小，建议 4GB 起步。用 root 用户 ssh 进去后执行以下的命令，然后静静等待即可。',
    //         summary: '选 CentOS 7 或 Debian 9 系统。内存不能太小，建议 4GB 起步。用 root 用户 ssh 进去后执行以下的命令，然后静静等待即可。',
    //         created_year: (new Date()).getFullYear(),
    //         created_month: (new Date()).getMonth() + 1,
    //         pathname: 'abciii' + Math.random(1, 10),
    //     });
    //     assert(result);
    // });

    // it('findByPathName', async () => {
    //     const result = await app.model.Post.findByPathname(2019, 3, 'life-of-a-message');
    //     assert(result !== null);
    // });

    // it('homeListByPage', async () => {
    //     const result = await app.model.Post.findAndCountAllForFront(0, 10);
    //     console.info(result);
    // });

    // it('destory', async () => {
    //     const result = await app.model.Post.destroy(0, '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e');
    //     assert(result);
    // });
});
