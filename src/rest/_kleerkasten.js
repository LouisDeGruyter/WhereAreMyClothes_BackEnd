const Router = require('@koa/router');
const kleerkastenService = require('../service/kleerkasten');
const Joi = require('joi');
const validate= require('./_validation');
const { create } = require('../service/kledingstukken');
// alle kleerkasten ophalen
const getKleerkasten = async(ctx) => {
    ctx.body =await kleerkastenService.getAll();
};
// nieuwe kleerkast toevoegen
const createKleerkast = async(ctx) => {
    ctx.body = await kleerkastenService.create({...ctx.request.body});
    ctx.status = 201; // created
};
createKleerkast.validationScheme = {
    body: {
        name: Joi.string().required(),
        userId: Joi.number().integer().positive().required(),
        location: Joi.string().required(),
    },
};
// kleerkast ophalen op basis van id
const getKleerkastById = async(ctx) => {
    ctx.body = await kleerkastenService.getKleerkastById(ctx.params.id);
};
getKleerkastById.validationScheme={
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
// kleerkast verwijderen op basis van id
const deleteKleerkast = async(ctx) => {
    ctx.body = await kleerkastenService.deleteById(ctx.params.id);
    ctx.status = 204; // geen content
};
deleteKleerkast.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
// kleerkast updaten op basis van id
const updateKleerkast = async(ctx) => {
    ctx.body = await kleerkastenService.updateKleerkastById(ctx.params.id, ctx.request.body);

};
updateKleerkast.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
    body: {
        name: Joi.string().required(),
        userId: Joi.number().integer().positive().required(),
        location: Joi.string().required(),
    },
};
// kledingstukken van de kleerkast ophalen op basis van id
const getKledingstukkenByKleerkastId = async(ctx) => {
    ctx.body = await kleerkastenService.getKledingstukkenByKleerkastId(ctx.params.id);
}; 
getKledingstukkenByKleerkastId.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
const belongsToUser = async(ctx) => {
    ctx.body = await kleerkastenService.belongsToUser(ctx.params.id);
};
belongsToUser.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

module.exports = (app) => {
    const router = new Router({prefix: '/kleerkasten'});
    router.get('/', getKleerkasten);
    router.get('/:id', validate(getKleerkastById.validationScheme),getKleerkastById);
    router.post('/', validate(createKleerkast.validationScheme),createKleerkast);
    router.delete('/:id', validate(deleteKleerkast.validationScheme),deleteKleerkast);
    router.put('/:id', validate(updateKleerkast.validationScheme),updateKleerkast);
    router.get('/:id/kledingstukken', validate(getKledingstukkenByKleerkastId.validationScheme),getKledingstukkenByKleerkastId);
    router.get('/:id/user', validate(belongsToUser.validationScheme),belongsToUser);
    app.use(router.routes()).use(router.allowedMethods());
}