const installKledingstukRouter = require('./_kledingstukken');
const installKleerkastRouter = require('./_kleerkasten');
const installHealthRouter = require('./_health');
const installUserRouter = require('./_users');
const Router = require('@koa/router');

module.exports = (app) => {
    const router = new Router({
        prefix: '/api'
    });
    installKledingstukRouter(router);
    installKleerkastRouter(router);
    installHealthRouter(router);
    installUserRouter(router);
    app.use(router.routes()).use(router.allowedMethods());
}