const Router = require('@koa/router');
const kledingstukkenService = require('../service/kledingstukken');
const Joi = require('joi');
const validate = require('./_validation');
const getKledingstukkken = async (ctx) => { // alle kledingstukken ophalen
    ctx.body = await kledingstukkenService.getAll();
};

const createKledingstuk = async (ctx) => { // nieuwe kledingstuk toevoegen
    ctx.body = await kledingstukkenService.create({
        ...ctx.request.body
    });
    ctx.status = 201; // created
};
createKledingstuk.validationScheme = {
    body: Joi.object({
        brand: Joi.string().required(),
        color: Joi.string().required(),
        type: Joi.string().required(),
        size: Joi.number().required(),
        kleerkastId: Joi.number().integer().positive().required(),
    }),
};

const getKledingstukById = async (ctx) => { // kledingstuk ophalen op basis van id
    ctx.body = await kledingstukkenService.getKledingstukById(ctx.params.id, ctx.state.user.sub); // id niet geparsed

};
getKledingstukById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const deleteKLedingstuk = async (ctx) => { // kledingstuk verwijderen op basis van id
    ctx.body = await kledingstukkenService.deleteById(ctx.params.id, ctx.state.user.sub);
    ctx.status = 204; // geen content

};
deleteKLedingstuk.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const updateKledingstuk = async (ctx) => { // kledingstuk updaten op basis van id
    ctx.body = await kledingstukkenService.updateKledingStukById(ctx.params.id, {
        ...ctx.request.body
    }, ctx.state.user.sub);
};
updateKledingstuk.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
        brand: Joi.string().required(),
        color: Joi.string().required(),
        size: Joi.number().required(),
        kleerkastId: Joi.number().integer().positive().required(),
        type: Joi.string().required(),
    }),
};
const belongsToUser = async (ctx) => { //gebruiker ophalen op basis van id
    ctx.body = await kledingstukkenService.belongsToUser(ctx.params.id);

};
belongsToUser.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
const belongsToKleerkast = async (ctx) => { //kleerkast ophalen op basis van id
    ctx.body = await kledingstukkenService.belongsToKleerkast(ctx.params.id);

};
belongsToKleerkast.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};



module.exports = (app) => {
    const router = new Router({
        prefix: '/kledingstukken'
    });
    router.get('/', getKledingstukkken);
    router.get('/:id', validate(getKledingstukById.validationScheme), getKledingstukById);
    router.post('/', validate(createKledingstuk.validationScheme), createKledingstuk);
    router.delete('/:id', validate(deleteKLedingstuk.validationScheme), deleteKLedingstuk);
    router.put('/:id', validate(updateKledingstuk.validationScheme), updateKledingstuk);
    router.get('/:id/user', validate(belongsToUser.validationScheme), belongsToUser);
    router.get('/:id/kleerkast', validate(belongsToKleerkast.validationScheme), belongsToKleerkast);

    app.use(router.routes()).use(router.allowedMethods());

}