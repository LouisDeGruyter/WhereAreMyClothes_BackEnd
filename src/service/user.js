const {getLogger} = require('../core/logging');
const {models:{user,kleerkast,kledingstuk}} = require('../data/models');
const ServiceError = require('../core/serviceError');

const getAllUsers= async ()=>{
    
    return await user.findAll({include: [{model:kleerkast, as:'kleerkasten',include:[{model:kledingstuk, as:"kledingstukken"}]}]}).then((users)=>{
   
            return {users:users,lengte:users.length};})
};

const getUserById=async(id)=>{
        const gebruiker = await user.findByPk(id,{include: [{model:kleerkast, as:'kleerkasten',include:[{model:kledingstuk, as:"kledingstukken"}]}]});
        if(!gebruiker){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
   

        return gebruiker;
};
    

const  createUser =async ({username,auth0id}) => {
    
        const gebruiker = await user.create({ username:username,auth0id:auth0id});
        return gebruiker.userId;
};

const updateUserById = async(id, {username}) => {
    const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }

        return existingUser.update({username:username});
    
};

const deleteUserById = async(id) => {
    
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        const gebruiker = await user.destroy({ where: {userId:id}})

        return gebruiker;
};
const getAllKledingstukkenOfUserById = async(id) => {
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        let kleerkasten = await existingUser.getKleerkasten();
        let kledingstukken=[];
        for(let i=0;i<kleerkasten.length;i++){
            let kledingstukkenVanKleerkast = await kleerkasten[i].getKledingstukken();
            for(let j=0;j<kledingstukkenVanKleerkast.length;j++){
                kledingstukken.push(kledingstukkenVanKleerkast[j]);
            }
        }

        return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
};
const getAllKleerkastenOfUserById = async(id) => {
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        const kleerkasten = await existingUser.getKleerkasten({include:[{model:kledingstuk, as:"kledingstukken"}]});
        return {kleerkasten:kleerkasten,lengte:kleerkasten.length};
};

const getByAuth0Id = async(auth0id) => {
    const existingUser = await user.findOne({ where: {auth0id:auth0id}});
    if(!existingUser){
        throw ServiceError.notFound(`Gebruiker met auth0id ${auth0id} bestaat niet`, {auth0id});
    }
    return existingUser;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getAllKledingstukkenOfUserById,
    getAllKleerkastenOfUserById,
    getByAuth0Id
};



