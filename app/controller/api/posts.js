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
        } = this.ctx.request.body;
        postInfo.title = title;
        postInfo.markdown_content = markdown_content;
        // 设置已发布
        postInfo.status = 1;
        const result = await postInfo.save();
        this.ctx.body = this.ctx.helper.success(!!result);
    }

    // PUT
    async meta() {
        const loginUserId = 0;
        const Post = this.ctx.app.model.Post;
        const { uuid } = this.ctx.params;
        const postInfo = await Post.findByUserIdAndUUID(loginUserId, uuid);
        if(!postInfo) {
            this.ctx.status = 404;
            this.ctx.body = this.ctx.helper.fail('资源不存在');
            return;
        }
        const {
            type = 0,
            pathname = uuid,
            summary = '',
        } = this.ctx.request.body;

        // TODO
        // 校验pathname 是否合法
        // 只允许数字字母中行线或下划线


        // 检查路径是否重复
        const isExits = await Post.findByPathname(postInfo.created_year, postInfo.created_month, pathname);
        if (!!isExits && isExits.uuid != uuid) {
            this.ctx.status = 400;
            this.ctx.body = this.ctx.helper.fail('验证失败，路径名冲突，有重复');
            return;
        }
        postInfo.type = parseInt(type, 10) === 0 ? 0 : 1;
        postInfo.pathname = pathname;
        postInfo.summary = summary;
        postInfo.save();

        // 判断 path
        this.ctx.body = this.ctx.helper.success(true);
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
