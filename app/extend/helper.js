
module.exports = {
    async renderBlogView(filename, data = {}) {
        const { app, ctx } = this;
        const { config: { themePath }, settings } = app;

        const tplName = `${themePath}${settings.theme}/${filename}.nj`;
        await ctx.render(tplName, {
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
