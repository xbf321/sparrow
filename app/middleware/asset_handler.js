const path = require('path');
const staticCache = require('koa-static-cache');
function safeDecodeURIComponent(text) {
    try {
      return decodeURIComponent(text)
    } catch (e) {
      return text
    }
}
module.exports = () => {
    return async (ctx, next) => {
        const { app } = ctx;
        const { themePath, env } = app.config;
        const isProd = env === 'prod';
        const prefix = '/themes/';

        if (ctx.method !== 'HEAD' && ctx.method !== 'GET')
            return await next();

        let filename = path.normalize(safeDecodeURIComponent(ctx.path));
        if (filename.charAt(0) === path.sep)
            filename = filename.slice(1);

        
        if (path.basename(filename)[0] === '.')
            return await next();

        const filePrefix = path.normalize(prefix.replace(/^\//, ''))
        if (filename.indexOf(filePrefix) !== 0)
            return await next();
        
        const dir = path.join(themePath, app.settings.theme);
        await staticCache(dir, {
            prefix,
            dynamic: true,
            preload: false,
            buffer: isProd,
            maxFiles: 1000,
            maxAge: isProd ? 31536000 : 0,
        })(ctx, next);
    }
};
