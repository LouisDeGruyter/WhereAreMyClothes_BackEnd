const Koa = require('koa');
const { initializeLogger,getLogger} = require('./core/logging'); 
const config = require('config'); 
const bodyParser = require('koa-bodyparser'); 
const installRest = require('./rest/index'); 
const koaCors = require('@koa/cors'); 
const {initializeDatabase} = require('../models');

const NODE_ENV = config.get('env'); 
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled'); 
const CORS_ORIGINS= config.get('cors.origins'); 
const CORS_MAX_AGE = config.get('cors.maxAge');
 
initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { env: NODE_ENV },
});

const app = new Koa(); // nieuwe koa applicatie
const logger = getLogger();

app.use(koaCors({ // cors toevoegen aan de applicatie
    origin:(ctx) => {
        if(CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1){
            return ctx.request.header.origin;
            }
        return CORS_ORIGINS[0];
         },
         allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
         maxAge: CORS_MAX_AGE,
         } ));
app.use(bodyParser()); // bodyparser toevoegen aan de applicatie
installRest(app); // rest toevoegen aan de applicatie
app.listen(9000, () => {
    logger.info('server gestart op poort 9000'); 
});





