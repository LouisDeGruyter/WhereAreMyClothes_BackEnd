 const {getLogger} = require('../core/logging');
 const {models:{kleerkast,user}} = require('../../models');
 const ServiceError = require('../core/serviceError');

 //ophalen van alle kleerkasten
 const getAll = async() => {
        return await kleerkast.findAll({include:['kledingstukken']}).then((kleerkasten)=>{

            return {kleerkasten:kleerkasten, lengte:kleerkasten.length};}
        )
    };
    
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = async(id,auth0) => {
            let kleerkastById = await kleerkast.findByPk(id,{include:['kledingstukken']});
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
        }
        let eigenaar = await kleerkastById.getUser();
        if(eigenaar.auth0id !== auth0){
            throw ServiceError.notFound(`Je hebt geen toegang tot deze kleerkast`,{id});
        }
            return kleerkastById;
       
    };
    //update kleerkast op basis van id
    const updateKleerkastById = async (id, {name,location,userId},auth0) => {
      
        let kleerkastById = await kleerkast.findByPk(id);
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
        }
        let eigenaar = await kleerkastById.getUser();
        if(eigenaar.auth0id !== auth0){
            throw ServiceError.notFound(`Je hebt geen toegang tot deze kleerkast`,{id});
        }
        
        const existingKleerkast = await kleerkast.findOne({where:{name,location:location,userId:userId}});
            if(existingKleerkast){
                throw ServiceError.validationFailed(`kleerkast met naam ${name} en locatie ${location} bestaat al`,{name,location});
            }

        
        let existingUser = await user.findByPk(userId);
        if(!existingUser){
            throw ServiceError.notFound(`user met id ${userId} bestaat niet`,{userId});
        }
        if(eigenaar.id !== userId){
            eigenaar.removeKleerkasten(kleerkastById);
            let nieuweEigenaar = await user.findByPk(userId);
            nieuweEigenaar.addKleerkasten(kleerkastById);

        }
        kleerkastById.name = name;
        kleerkastById.location = location;
        kleerkastById.userId = userId;

        return await kleerkastById.save();
};

    //ophalen van alle kledingstukken van een kleerkast
    const getKledingstukkenByKleerkastId = async(kleerkastId,auth0) => {
       
        let kleerkastById = await kleerkast.findByPk(kleerkastId);
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${kleerkastId} bestaat niet`,{kleerkastId});
        }
        let eigenaar = await kleerkastById.getUser();
        if(eigenaar.auth0id !== auth0){
            throw ServiceError.notFound(`Je hebt geen toegang tot deze kleerkast`,{id});
        }
        
        const kleding =  await kleerkastById.getKledingstukken();

            return {kledingstukken: kleding, lengte: kleding.length};
        

    };
    
    
    //kleerkast verwijderen op basis van id
    const deleteById = async (id,auth0) => {
            let kleerkastById = await kleerkast.findByPk(id);
            if(!kleerkastById){
                throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
            }
            let eigenaar = await kleerkastById.getUser();
            if(eigenaar.auth0id !== auth0){
                throw ServiceError.notFound(`Je hebt geen toegang tot deze kleerkast`,{id});
            }
           
            kleerkastById.destroy();

       
    };
    //kleerkast toevoegen
    const create = async({name,location,userId}) => {
      
            const existingKleerkast = await kleerkast.findOne({where:{name,location:location,userId:userId}});
            if(existingKleerkast){
                throw ServiceError.validationFailed(`kleerkast met naam ${name} en locatie ${location} bestaat al`,{name,location});
            }
            const existingUser = await user.findOne({where:{userId:userId}});
            
            const newKleerkast = await kleerkast.create({name,location,userId});
            existingUser.addKleerkasten(newKleerkast);

            
            return newKleerkast;
    };
    const belongsToUser = async(Id) => {
        
            const kleerkastById = await kleerkast.findByPk(Id);
            if(!kleerkastById){
                throw ServiceError.notFound(`kleerkast met id ${Id} bestaat niet`,{Id});
            }
            const gebruiker = await kleerkastById.getUser();

            return gebruiker;
    };

    module.exports = { 
        getAll, getKleerkastById, getKledingstukkenByKleerkastId, updateKleerkastById, deleteById, create, belongsToUser
    };