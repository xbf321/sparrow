
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const ctx = this.ctx;
        ctx.body = 'xxx';
    }
}

module.exports = HomeController;
