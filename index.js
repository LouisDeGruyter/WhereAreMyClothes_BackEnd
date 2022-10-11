// import Koa from 'koa';
const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    ctx.body = 'Hello world'
    await next;
});
app.use(async (ctx, next) => {
    console.log(ctx);
    await next();
});

app.listen(9000);