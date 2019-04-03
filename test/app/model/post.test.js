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

    // it('findBySlug', async () => {
    //     const result = await app.model.Post.findBySlug(2019, 3, 'life-of-a-message');
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
        const uuid = '55702f304a2d11e9aee463b728329d22';
        const postInfo = await app.model.Post.findByUserIdAndUUID(loginUserId, uuid);
        assert(postInfo);
        postInfo.title = `title-${Date.now()}`;
        postInfo.summary = 'summary';
        postInfo.markdown_content = `# i am h1 \n ssss \n # i am h1 too. \n ## i am h2-${Date.now()}\n hear is body. \n ### i am a h3\n ### i am h4 \n #### i am h5`;
        const result = await postInfo.save();
        assert(result);
    })
});
