const Koa = require('koa'); // import Koa from 'koa';
const {
    getLogger
} = require('./core/logging'); // import {getLogger} from './core/logging';
const app = new Koa(); // nieuwe koa applicatie
const logger = getLogger(); // nieuwe logger

app.use(async (ctx, next) => {
    logger.info('eerste keer');
    await next();
    logger.info('tweede keer');
});

app.use(async (ctx) => { // ctx = context, next = volgende middleware
    // console.log(ctx);
    ctx.body = 'Hello world'
});
app.listen(9000);
logger.info('server gestart op poort 9000');