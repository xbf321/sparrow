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
    //     const result = await app.model.Post.createEmpty(0);
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

    it('PUT-UPDATE', async () => {
        const loginUserId = 0;
        const uuid = 'fb4c363047fb11e9b98aabbd772f5990';
        const postInfo = await app.model.Post.findByUserIdAndUUID(loginUserId, uuid);
        assert(postInfo);
        postInfo.title = '标题';
        postInfo.summary = 'summary';
        postInfo.markdown_content = 'markdown_content';
        const result = await postInfo.save();
        assert(result);
    })
});
