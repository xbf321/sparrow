const Controller = require('egg').Controller;

class PostsController extends Controller {
    // GET 列表
    async index() {
        const { pageIndex } = this.ctx.query;
        // 获得当前登录用户 Id
        const loginUserId = 0;
        const result = await this.ctx.app.model.Post.findAndCountAllForAPI({
            loginUserId,
            pageIndex,
        });
        this.ctx.body = this.ctx.helper.success(result);
    }

    // POST
    async create() {
        const loginUserId = 0;
        const result = await this.ctx.app.model.Post.createEmpty(loginUserId);
        if (!result) {
            // Error
            this.ctx.status = 500;
            return;
        }
        this.ctx.body = this.ctx.helper.success(result);
    }

    // GET
    async show() {
        const loginUserId = 0;
        const { id: uuid } = this.ctx.params;
        const result = await this.ctx.app.model.Post.findByUserIdAndUUID(loginUserId, uuid);
        if(!result) {
            this.ctx.status = 404;
            return;
        }
        this.ctx.body = this.ctx.helper.success(result);
    }

    // PUT
    async update() {
        const loginUserId = 0;
        const { id: uuid } = this.ctx.params;
        const postInfo = await this.ctx.app.model.Post.findByUserIdAndUUID(loginUserId, uuid);
        if(!postInfo) {
            this.ctx.status = 404;
            return;
        }
        const {
            title,
            markdown_content,
            type = 0,
            slug = uuid,
            summary = '',
        } = this.ctx.request.body;
        // TODO
        // 校验 slug 是否合法
        // 只允许数字字母中行线或下划线


        // 检查路径是否重复
        const isExits = await this.ctx.app.model.Post.findBySlug(postInfo.created_year, postInfo.created_month, slug);
        if (!!isExits && isExits.uuid != uuid) {
            this.ctx.status = 400;
            this.ctx.body = this.ctx.helper.fail('验证失败，路径名冲突，有重复');
            return;
        }
        postInfo.type = parseInt(type, 10) === 0 ? 0 : 1;
        postInfo.slug = slug;
        postInfo.summary = summary;

        postInfo.title = title;
        postInfo.markdown_content = markdown_content;
        const result = await postInfo.save();
        this.ctx.body = this.ctx.helper.success(!!result);
    }

    async destroy() {
        const loginUserId = 0;
        const { id: uuid } = this.ctx.params;

        const result = await this.ctx.app.model.Post.destroy(loginUserId, uuid);

        if(!result) {
            this.ctx.status = 400;
            return;
        }
    }

}

module.exports = PostsController;
