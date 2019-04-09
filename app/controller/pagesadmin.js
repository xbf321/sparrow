const Controller = require('egg').Controller;

class PagesAdminController extends Controller {
    async index() {
        const { userId, userName } = this.ctx.session;
        await this.ctx.render('pagesadmin/index.nj', {
            settings: JSON.stringify(this.ctx.app.settings),
            userInfo: JSON.stringify({
                userId,
                userName,
            })
        });
    }

    async login() {
        await this.ctx.render('pagesadmin/login.nj');
    }

    async logout() {
        this.ctx.session = null;
        this.ctx.redirect('/pagesadmin/login');
    }
}

module.exports = PagesAdminController;
