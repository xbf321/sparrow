const Controller = require('egg').Controller;

class PostsController extends Controller {
    // PUT
    async update() {
        const Settings = this.ctx.app.model.Settings;
        const body = this.ctx.request.body;

        for (let key in body) {
            const result = await Settings.findByKey(key);
            if (result) {
                result.value = body[key];
                await result.save();
            } else {
                // create

            }
        }
        this.ctx.body = this.ctx.helper.success(true);;
    }
}

module.exports = PostsController;