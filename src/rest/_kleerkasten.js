const Router = require('@koa/router');
const kleerkastenService = require('../service/kleerkasten');
const userService = require('../service/user');
const Joi = require('joi');
const validate= require('./_validation');
const { create } = require('../service/kledingstukken');
const {addUserInfo} = require('../core/auth');
// alle kleerkasten ophalen
const getKleerkasten = async(ctx) => {
    ctx.body =await kleerkastenService.getAll();
};
// nieuwe kleerkast toevoegen
const createKleerkast = async(ctx) => {
    let userId=0;
    try{
    const user= await userService.getByAuth0Id(ctx.state.user.sub);
    userId=user.userId;
    }catch(err){
        console.log(err);
        console.log(ctx.state);
        await addUserInfo(ctx);
        userId= await userService.createUser({
            username:ctx.state.user.name,
            auth0id:ctx.state.user.sub,
        })
    }
    const newKleerkast = await kleerkastenService.create({
        ...ctx.request.body,
        userId:userId,
    });
    ctx.body = newKleerkast
    ctx.status = 201; // created
};

createKleerkast.validationScheme = {
    body: {
        name: Joi.string().required(),
        location: Joi.string().required(),
    },
};
// kleerkast ophalen op basis van id
const getKleerkastById = async(ctx) => {
    ctx.body = await kleerkastenService.getKleerkastById(ctx.params.id,ctx.state.user.sub);
};
getKleerkastById.validationScheme={
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
// kleerkast verwijderen op basis van id
const deleteKleerkast = async(ctx) => {
    ctx.body = await kleerkastenService.deleteById(ctx.params.id,ctx.state.user.sub);
    ctx.status = 204; // geen content
};
deleteKleerkast.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
// kleerkast updaten op basis van id
const updateKleerkast = async(ctx) => {
    ctx.body = await kleerkastenService.updateKleerkastById(ctx.params.id, ctx.request.body,ctx.state.user.sub);

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
    ctx.body = await kleerkastenService.getKledingstukkenByKleerkastId(ctx.params.id, ctx.state.user.sub);
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