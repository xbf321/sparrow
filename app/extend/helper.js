
module.exports = {
    async renderBlogView(filename, data = {}) {
        const { app, ctx } = this;
        const { config: { themePath }, siteConfig } = app;

        const tplName = `${themePath}${siteConfig.theme}/${filename}.nj`;
        await ctx.render(tplName, {
            siteConfig,
            ...data,
        });
    },
    success(data) {
        return {
            status: 0,
            data,
        };
    },
};
