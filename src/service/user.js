const {getLogger} = require('../core/logging');
const {models:{user,kleerkast,kledingstuk}} = require('../../models');
const ServiceError = require('../core/serviceError');
const debugLog = (message, meta = {}) => {
   if(!this.logger) this.logger= getLogger();
   this.logger.debug(message, meta);
};
const getAllUsers= async ()=>{
    
    return await user.findAll({include: [{model:kleerkast, as:'kleerkasten',include:[{model:kledingstuk, as:"kledingstukken"}]}]}).then((users)=>{
        debugLog('Alle gebruikers worden opgehaald');
            return {users:users,lengte:users.length};})
};

const getUserById=async(id)=>{
        const gebruiker = await user.findByPk(id,{include: [{model:kleerkast, as:'kleerkasten',include:[{model:kledingstuk, as:"kledingstukken"}]}]});
        if(!gebruiker){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        debugLog(`Gebruiker met id ${id} wordt opgehaald`);

        return gebruiker;
};
    

const  createUser =async ({username, email, password}) => {
    if(!username || !email || !password){
        throw ServiceError.validationFailed(`Een of meerdere velden zijn niet ingevuld`,{username,email,password});
    }
    const UserwithMail = await user.findOne({ where: {email:email}});
    if(UserwithMail){
        throw ServiceError.validationFailed(`Gebruiker met email ${email} bestaat al`, {email});
    }
        const gebruiker = await user.create({ username:username, email:email, password:password})
        debugLog(`Gebruiker met gebruikersnaam ${username}, email ${email}, passwoord ${password} wordt toegevoegd`);
        return gebruiker;
};

const updateUserById = async(id, {username, email, password}) => {
    const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        if(!username || !email || !password){
            throw ServiceError.validationFailed(`Een of meerdere velden zijn niet ingevuld`,{username,email,password});
        }
        const UserwithMail = await user.findOne({ where: {email:email}});
    if(UserwithMail && UserwithMail.userId!=id){
        throw ServiceError.validationFailed(`Gebruiker met email ${email} bestaat al`, {email});
    }
        debugLog(`Gebruiker met id ${id} wordt geupdate`);
        return existingUser.update({username:username, email:email, password:password});
    
};

const deleteUserById = async(id) => {
    
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        const gebruiker = await user.destroy({ where: {userId:id}})

        debugLog(`Gebruiker met id ${id} wordt verwijderd`);
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

        debugLog(`Kledingstukken van gebruiker met id ${id} worden opgehaald`);
        return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
};
const getAllKleerkastenOfUserById = async(id) => {
        const existingUser = await user.findByPk(id);
        if(!existingUser){
            throw ServiceError.notFound(`Gebruiker met id ${id} bestaat niet`, {id});
        }
        const kleerkasten = await existingUser.getKleerkasten();
        debugLog(`Kleerkasten van gebruiker met id ${id} worden opgehaald`);
        return {kleerkasten:kleerkasten,lengte:kleerkasten.length};
};


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getAllKledingstukkenOfUserById,
    getAllKleerkastenOfUserById
};



