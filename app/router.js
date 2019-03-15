/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, middlewares } = app;

    const siteConfigHandler = middlewares.siteConfigHandler();

    router.resources('posts', '/api/posts', controller.api.posts);

    // 归档
    router.get(/^\/([1-2][0-9][0-9][0-9])\/?$/, siteConfigHandler, controller.frontend.archive);
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/?$/, siteConfigHandler, controller.frontend.archive);

    // 详情页
    router.get(/^\/([1-2][0-9][0-9][0-9])\/([0-1]{0,1}[0-9])\/([\w_-]+)\.html$/, siteConfigHandler, controller.frontend.post);
    

    // Tag
    router.get('/tag/:tagname', siteConfigHandler, controller.frontend.tag);

    // Pageadmin
    router.get('/pagesadmin', controller.pagesadmin.index);
    router.get('/pagesadmin/*', controller.pagesadmin.index);
    
    // Home
    router.get('/', siteConfigHandler, controller.frontend.index);
    router.get('/test', siteConfigHandler, controller.frontend.test);
};
