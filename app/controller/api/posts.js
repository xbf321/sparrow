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

    async create() {
        this.ctx.body = 'create';
    }

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

    async update() {
        this.ctx.body = 'update';
    }

    async destroy() {
        const loginUserId = 0;
        const { id: uuid } = this.ctx.params;

        const result = await this.ctx.app.model.Post.destroy(loginUserId, uuid);

        if(!result) {
            this.ctx.status = 404;
            return;
        }
        this.ctx.status = 200;
    }

}

module.exports = PostsController;
