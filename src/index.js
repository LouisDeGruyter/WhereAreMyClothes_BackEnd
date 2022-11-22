const Koa = require('koa'); // import Koa from 'koa';
const { getLogger} = require('./core/logging'); // import {getLogger} from './core/logging';
const config = require('config'); // import config from './config';
const bodyParser = require('koa-bodyparser'); // import bodyParser from 'koa-bodyparser';
const Router = require('@koa/router'); // import Router from 'koa-router';
const installRest = require('./rest/index'); // import installRest from './rest';

const logger = getLogger(); // nieuwe logger
const NODE_ENV = config.get('env'); // haal de NODE_ENV op uit de config
const LOG_LEVEL = config.get('log.level'); // loglevel uit config halen
const LOG_DISABLED = config.get('log.disabled'); // logdisabled uit config halen
logger.info(`${NODE_ENV} - level: ${LOG_LEVEL}, disabled:${LOG_DISABLED}`); 

const app = new Koa(); // nieuwe koa applicatie
app.use(bodyParser()); // bodyparser toevoegen aan de applicatie
installRest(app); // rest toevoegen aan de applicatie


app.listen(9000);
logger.info('server gestart op poort 9000');
