const Router = require('@koa/router');
const userService = require('../service/user');
const Joi = require('joi');
const validate= require('./_validation');
const getUser = async(ctx) => {
    ctx.body = await userService.getUserById(ctx.params.id);
};
getUser.validationScheme={
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const createUser = async(ctx) => {
    ctx.body = await userService.createUser(ctx.request.body);
    ctx.status = 201;
};
createUser.validationScheme = {
    body: {
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    },
};

const updateUser = async(ctx) => {
    ctx.body = await userService.updateUserById(ctx.params.id, ctx.request.body);

};
updateUser.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
    body: {
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    },
};


const deleteUser = async(ctx) => {
    ctx.body = await userService.deleteUserById(ctx.params.id);
    ctx.status = 204;
};
deleteUser.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};


const getAllUsers = async(ctx) => {
    ctx.body = await userService.getAllUsers();
};
const getKledingstukkenByUserId = async(ctx) => {
    ctx.body = await userService.getAllKledingstukkenOfUserById(ctx.params.id);
};
getKledingstukkenByUserId.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
const getAllKleerkastenOfUserById = async(ctx) => {
    ctx.body = await userService.getAllKleerkastenOfUserById(ctx.params.id);
};
getAllKleerkastenOfUserById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};
module.exports = (app) => {
    const router = new Router({ prefix: '/users'});
    router.get('/', getAllUsers);
    router.get('/:id', validate(getUser.validationScheme),getUser);
    router.post('/', validate(createUser.validationScheme),createUser);
    router.put('/:id', validate(updateUser.validationScheme),updateUser);
    router.delete('/:id', validate(deleteUser.validationScheme),deleteUser);
    router.get('/:id/kledingstukken', validate(getKledingstukkenByUserId.validationScheme),getKledingstukkenByUserId);
    router.get('/:id/kleerkasten', validate(getAllKleerkastenOfUserById.validationScheme),getAllKleerkastenOfUserById);
    app.use(router.routes()).use(router.allowedMethods());
}

