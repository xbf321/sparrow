/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middlewares } = app;
    const settingsHandler = middlewares.settingsHandler();

    // API
    router.put('/api/settings', controller.api.settings.update);
    router.put('/api/posts/:uuid/meta', controller.api.posts.meta);
    router.resources('posts', '/api/posts', controller.api.posts);
    
    // 后台
    router.get('/pagesadmin/login', settingsHandler, controller.pagesadmin.login);
    router.get('/pagesadmin/logout', settingsHandler, controller.pagesadmin.logout);
    router.get('/pagesadmin', settingsHandler, controller.pagesadmin.index);
    router.get('/pagesadmin/*', settingsHandler, controller.pagesadmin.index);

    // 前台
    // 归档
    router.get(/^\/([1-2][0-9][0-9][0-9])\/?$/, settingsHandler, controller.frontend.archive);
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/?$/, settingsHandler, controller.frontend.archive);
    // 详情页
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/([\w_-]+)\.html$/, settingsHandler, controller.frontend.post);
    // Tag
    router.get('/tag/:tagname', settingsHandler, controller.frontend.tag);
    // 首页
    router.get('/', settingsHandler, controller.frontend.index);

    // 测试
    router.get('/test', settingsHandler, controller.frontend.test);
};
