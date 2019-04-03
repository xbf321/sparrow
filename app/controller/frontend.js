const Controller = require('egg').Controller;
const _ = require('lodash');
const TocBuilder = require('markdown-toc');

class FrontendController extends Controller {

    /**
     * 首页
     */
    async index() {
        const ctx = this.ctx;
        const pageIndex = _.toInteger(ctx.query.pageIndex || 1);
        const pageSize = _.toInteger(ctx.app.settings.pageSize || 10);
        const result = await ctx.app.model.Post.findAndCountAllForFront(pageIndex, pageSize);

        const pagination = {
            pageIndex,
            pageSize,
            totalPages: Math.ceil(result.count / pageSize),
        };
        await ctx.helper.renderBlogView('index', {
            posts: result.rows,
            pagination,
        });
    }

    /**
     * 详情页
     */
    async post() {
        const ctx = this.ctx;
        const year = ctx.params[0];
        const month = ctx.params[1];
        const pathname = ctx.params[2];

        const result = await ctx.app.model.Post.findByPathname(year, month, pathname);
        if (result === null) {
            ctx.status = 404;
            return;
        }
        const prevAndNext = await ctx.app.model.Post.findPrevAndNext(result.id, result.created_at);
        result.prev = prevAndNext.prev;
        result.next = prevAndNext.next;
        const toc = TocBuilder(result.markdown_content).content;
        // view_num 加1
        await result.increment('view_num');
        await ctx.helper.renderBlogView('post', {
            post: result,
            toc,
        });
    }

    /**
     * 归档
     */
    async archive() {
        const ctx = this.ctx;

        // ctx.body = 'archive';
        ctx.body = `archive:${ctx.params[0]}-${ctx.params[1]}-${ctx.params[2]}-${ctx.params[3]}`;
    }

    /**
     * Tag
     */
    async tag() {
        const ctx = this.ctx;

        ctx.body = ctx.params;
    }

    async test() {
        await this.ctx.render('sparrow/index.nj');
    }
}

module.exports = FrontendController;
