module.exports = () => {
    // 把站点信息挂在到 APP 上
    return async (ctx, next) => {
        const { app } = ctx;
        const result = await app.model.SiteConfig.findAll({
            attributes: [ 'key', 'value' ],
        });
        const config = {};
        if (result.length > 0) {
            // 扁平化配置
            result.forEach(item => {
                config[item.key] = item.value;
            });
        }
        app.siteConfig = config;
        await next();
    };
};
