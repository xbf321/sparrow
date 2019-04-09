const Controller = require('egg').Controller;

class LoginController extends Controller {
    // POST
    async index() {
        const {
            userName,
            password
        } = this.ctx.request.body;
        if (userName === 'xbf321' && password === 'x123123') {
            this.ctx.body = this.ctx.helper.success(true);
            this.ctx.session.userName = 'xbf321';
            this.ctx.session.userId = 1;
            return;
        }
        this.ctx.body = this.ctx.helper.fail('用户名或密码错误，请重试。');
    }
}

module.exports = LoginController;
