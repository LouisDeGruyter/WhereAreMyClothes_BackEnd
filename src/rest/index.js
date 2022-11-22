const installKledingstukRouter = require('./_kledingstukken');
const installKleerkastRouter = require('./_kleerkasten');
const Router = require('@koa/router');

module.exports = (app) => {
    const router = new Router({ prefix: '/api'});
    installKledingstukRouter(router);
    installKleerkastRouter(router);
    app.use(router.routes()).use(router.allowedMethods());
}