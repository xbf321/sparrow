module.exports = () => {
    return async (ctx, next) => {
        
        const { userId = -1 } = ctx.session;
        const { path } = ctx;

        if (userId == -1 && path.indexOf('/api/') >= 0) {
            ctx.body = ctx.helper.fail('用户未登录。');
            return;
        }
        if (userId === -1) {
            ctx.redirect('/pagesadmin/login');
        }   
        await next();
    };
};
