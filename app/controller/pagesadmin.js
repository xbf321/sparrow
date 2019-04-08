const Controller = require('egg').Controller;

class PagesAdminController extends Controller {
    async index() {
        await this.ctx.render('pagesadmin/index.nj', {
            settings: JSON.stringify(this.ctx.app.settings),
            userInfo: JSON.stringify({
                userId: 0,
            })
        });
    }

    async login() {
        const { method } = this.ctx.request;
        if (method.toUpperCase() === 'POST') {
            
        }
        console.info(method);
        await this.ctx.render('pagesadmin/login.nj');
    }

    async logout() {
        this.ctx.body = 'logout';
    }
}

module.exports = PagesAdminController;
