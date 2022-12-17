const Router = require('@koa/router');
const userService = require('../service/user');
const Joi = require('joi');
const validate= require('./_validation');
const {addUserInfo} = require('../core/auth');
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
        auth0id: Joi.string().required(), 
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
    if(ctx.request.body.email){
        ctx.body = await userService.getUserByEmail(ctx.request.body.email);
    }
    else
    ctx.body = await userService.getAllUsers();
};
const getKledingstukkenByUserId = async(ctx) => {
    let userId=0;
    try{
    const user= await userService.getByAuth0Id(ctx.state.user.sub);
    userId=user.userId;
    }catch(err){
        await addUserInfo(ctx);
        userId= await userService.createUser({
            username:ctx.state.user.name,
            auth0id:ctx.state.user.sub,
        })
    }
    ctx.body = await userService.getAllKledingstukkenOfUserById(userId);
};

const getAllKleerkastenOfUserById = async(ctx) => {
    let userId=0;
    try{
    const user= await userService.getByAuth0Id(ctx.state.user.sub);
    userId=user.userId;
    }catch(err){
        await addUserInfo(ctx);
        userId= await userService.createUser({
            username:ctx.state.user.name,
            auth0id:ctx.state.user.sub,
        })
    }
    ctx.body = await userService.getAllKleerkastenOfUserById(userId);
};

 

module.exports = (app) => {
    const router = new Router({ prefix: '/users'});
    router.get('/', getAllUsers);
    router.get('/:id', validate(getUser.validationScheme),getUser);
    router.post('/', validate(createUser.validationScheme),createUser);
    router.put('/:id', validate(updateUser.validationScheme),updateUser);
    router.delete('/:id', validate(deleteUser.validationScheme),deleteUser);
    router.get('/:id/kledingstukken',getKledingstukkenByUserId);
    router.get('/:id/kleerkasten', getAllKleerkastenOfUserById);

    app.use(router.routes()).use(router.allowedMethods());
}

