module.exports = () => {
    // 把站点信息挂在到 APP 上
    return async (ctx, next) => {
        const { app } = ctx;
        const result = await app.model.Settings.findAll({
            attributes: [ 'key', 'value' ],
        });
        const settings = {};
        if (result.length > 0) {
            // 扁平化配置
            result.forEach(item => {
                settings[item.key] = item.value;
            });
        }
        app.settings = settings;
        await next();
    };
};
