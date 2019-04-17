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
        const slug = ctx.params[2];

        const post = await ctx.app.model.Post.findByYearMonthAndSlug(year, month, slug);
        if (post === null) {
            ctx.status = 404;
            return;
        }
        const prevAndNext = await ctx.app.model.Post.findPrevAndNext(post.id, post.created_at);
        post.prev = prevAndNext.prev;
        post.next = prevAndNext.next;
        const toc = TocBuilder(post.markdown_content).content;
        // view_num 加1
        await post.increment('view_num');
        await ctx.helper.renderBlogView('post', {
            post,
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
     * 「页面」类型页面
     */
    async page() {
        const ctx = this.ctx;
        const slug = this.ctx.params[0];
        const post = await ctx.app.model.Post.findBySlug(slug);
        if (post === null) {
            ctx.status = 404;
            return;
        }
        // view_num 加1
        await post.increment('view_num');
        await ctx.helper.renderBlogView('page', {
            post,
        });
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
