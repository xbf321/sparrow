/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    const authHandler = app.middlewares.authHandler();

    // API
    router.post('/api/login', controller.api.login.index);
    router.put('/api/settings', authHandler, controller.api.settings.update);
    router.put('/api/posts/:uuid/meta', authHandler, controller.api.posts.meta);
    router.resources('posts', '/api/posts', authHandler, controller.api.posts);
    
    // 后台
    router.get('/pagesadmin/login', controller.pagesadmin.login);
    router.get('/pagesadmin/logout', controller.pagesadmin.logout);
    router.get('/pagesadmin', authHandler, controller.pagesadmin.index);
    router.get('/pagesadmin/*', authHandler, controller.pagesadmin.index);

    // 前台
    // 归档
    router.get(/^\/([1-2][0-9][0-9][0-9])\/?$/, controller.frontend.archive);
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/?$/, controller.frontend.archive);
    // 详情页
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/([\w_-]+)\.html$/, controller.frontend.post);
    // Tag
    router.get('/tag/:tagname', controller.frontend.tag);
    // 首页
    router.get('/', controller.frontend.index);

    // 测试
    router.get('/test', controller.frontend.test);
};
