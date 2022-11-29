const Koa = require('koa');
const {
    initializeLogger,
    getLogger
} = require('./core/logging');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./rest/index');
const koaCors = require('@koa/cors');
const db = require('../models')



const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const app = new Koa();

module.exports = async function createServer() {
    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        defaultMeta: {
            NODE_ENV
        },
    });



  

    //database
    db.functions.initializeData();

    const logger = getLogger();
    app.use(
        koaCors({
            origin: (ctx) => {
                if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
                    return ctx.request.header.origin;
                }
                // Not a valid domain at this point, let's return the first valid as we should return a string
                return CORS_ORIGINS[0];
            },
            allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
            maxAge: CORS_MAX_AGE,
        })
    );

    app.use(bodyParser());
    installRest(app);


    return {
        getApp() {
            return app;
        },
        start() {
            return new Promise((resolve) => {
                app.listen(9000);
                logger.info(`Server started on port 9000`);
                resolve()
            });
        },

        async stop() {
            app.removeAllListeners();
            await db.functions.shutdownData();
            getLogger().info('Goodbye');
        }
    };
}