
module.exports = {
    async renderBlogView(filename, data = {}) {
        const { app, ctx } = this;
        const { settings } = app;
        const hotPosts = await ctx.app.model.Post.findHotList();
        const tplName = `${settings.theme}/${filename}.nj`;
        await ctx.render(tplName, {
            hotPosts,
            settings,
            ...data,
        });
    },
    success(data) {
        return {
            status: 0,
            data,
        };
    },
    fail(message = '') {
        return {
            status: -1,
            message,
        };
    }
};
