/**
 * 前台 404 处理，不涉及到后台页面
 */
module.exports = () => {
    return async function (ctx, next) {
        await next();
        const { status } = ctx;
        if (status === 404) {
            await ctx.helper.renderBlogView('404');
        }
    }
}