const Controller = require('egg').Controller;

class PagesAdminController extends Controller {
    async index() {
        await this.ctx.render('pagesadmin/index.nj');
    }
}

module.exports = PagesAdminController;
