const {getLogger} = require('../core/logging');
const {models:{user,kleerkast,kledingstuk}} = require('../../models');
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
    

const  createUser =async ({username, email, password}) => {
    
    const UserwithMail = await user.findOne({ where: {email:email}});
    if(UserwithMail){
        throw ServiceError.validationFailed(`Gebruiker met email ${email} bestaat al`, {email});
    }
        const gebruiker = await user.create({ username:username, email:email, password:password})

        return gebruiker;
};

const updateUserById = async(id, {username, email, password}) => {
    const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
      
        const UserwithMail = await user.findOne({ where: {email:email}});
    if(UserwithMail && UserwithMail.userId!=id){
        throw ServiceError.validationFailed(`Gebruiker met email ${email} bestaat al`, {email});
    }

        return existingUser.update({username:username, email:email, password:password});
    
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
        const kleerkasten = await existingUser.getKleerkasten();
        return {kleerkasten:kleerkasten,lengte:kleerkasten.length};
};

const getUserByEmail = async(email) => {
    const existingUser = await user.findOne({ where: {email:email}});
    if(!existingUser){
        throw ServiceError.notFound(`Gebruiker met email ${email} bestaat niet`, {email});
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
    getUserByEmail
};



