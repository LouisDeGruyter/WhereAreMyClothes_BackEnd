const Koa = require('koa'); // import Koa from 'koa';
const { getLogger} = require('./core/logging'); // import {getLogger} from './core/logging';
const config = require('config'); // import config from './config';
const bodyParser = require('koa-bodyparser'); // import bodyParser from 'koa-bodyparser';
const Router = require('@koa/router'); // import Router from 'koa-router';
const kledingstukkenService = require('./service/kledingstukken'); // import kledingstukkenService from './service/kledingstukken';

const logger = getLogger(); // nieuwe logger
const NODE_ENV = config.get('env'); // haal de NODE_ENV op uit de config
const LOG_LEVEL = config.get('log.level'); // loglevel uit config halen
const LOG_DISABLED = config.get('log.disabled'); // logdisabled uit config halen
logger.info(`${NODE_ENV} - level: ${LOG_LEVEL}, disabled:${LOG_DISABLED}`); 

const app = new Koa(); // nieuwe koa applicatie
const router = new Router(); // nieuwe router
app.use(bodyParser()); // bodyparser toevoegen aan de applicatie


router.get('/api/kledingstukken', async(ctx) => {
        ctx.body= kledingstukkenService.getAll();
});
router.post('/api/kledingstukken', async(ctx) => {
    ctx.body = kledingstukkenService.create({...ctx.request.body});
});

router.get('/api/kledingstukken/:id', async(ctx)=>{
    console.log(ctx.params.id);
    console.log(kledingstukkenService.getKledingstukById(ctx.params.id));
    ctx.body= kledingstukkenService.getKledingstukById(ctx.params.id); // id niet geparsed
});

router.delete('/api/kledingstukken/:id', async(ctx)=>{
    ctx.body= kledingstukkenService.deleteById(ctx.params.id);
    ctx.status=204; // geen content
});

router.put('/api/kledingstukken/:id', async(ctx)=>{
    ctx.body= kledingstukkenService.updateKledingStukById(ctx.params.id, {...ctx.request.body});
});



 app.use(router.routes());
    app.use(router.allowedMethods());
app.listen(9000);
logger.info('server gestart op poort 9000');