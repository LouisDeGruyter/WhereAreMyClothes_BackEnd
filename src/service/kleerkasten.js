 const {getLogger} = require('../core/logging');
 const {models:{kleerkast,user}} = require('../../models');
 const ServiceError = require('../core/serviceError');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
 //ophalen van alle kleerkasten
 const getAll = async() => {
        return await kleerkast.findAll({include:['kledingstukken']}).then((kleerkasten)=>{
            debugLog('Alle kleerkasten worden opgehaald');
            return {kleerkasten:kleerkasten, lengte:kleerkasten.length};}
        )
    };
    
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = async(id) => {
            let kleerkastById = await kleerkast.findByPk(id,{include:['kledingstukken']});
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
        }
            debugLog(`Kleerkast met id ${id} wordt opgehaald`);
            return kleerkastById;
       
    };
    //update kleerkast op basis van id
    const updateKleerkastById = async (id, {name,location,userId}) => {

        let kleerkastById = await kleerkast.findByPk(id);
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
        }
        let existingUser = await user.findByPk(userId);
        if(!existingUser){
            throw ServiceError.notFound(`user met id ${userId} bestaat niet`,{userId});
        }
        let eigenaar = await kleerkastById.getUser();
        if(eigenaar.id !== userId){
            eigenaar.removeKleerkasten(kleerkastById);
            let nieuweEigenaar = await user.findByPk(userId);
            nieuweEigenaar.addKleerkasten(kleerkastById);

        }
        kleerkastById.name = name;
        kleerkastById.location = location;
        kleerkastById.userId = userId;
        debugLog(`Kleerkast met id ${id} updaten`);
        return await kleerkastById.save();
};

    //ophalen van alle kledingstukken van een kleerkast
    const getKledingstukkenByKleerkastId = async(kleerkastId) => {
       
        let kleerkastById = await kleerkast.findByPk(kleerkastId);
        if(!kleerkastById){
            throw ServiceError.notFound(`kleerkast met id ${kleerkastId} bestaat niet`,{kleerkastId});
        }
        const kleding =  await kleerkastById.getKledingstukken();
            debugLog(`Kledingstukken van kleerkast met id ${kleerkastId} worden opgehaald`);
            return {kledingstukken: kleding, lengte: kleding.length};
        

    };
    
    
    //kleerkast verwijderen op basis van id
    const deleteById = async (id) => {
            let kleerkastById = await kleerkast.findByPk(id);
            if(!kleerkastById){
                throw ServiceError.notFound(`kleerkast met id ${id} bestaat niet`,{id});
            }
            kleerkastById.destroy();
            debugLog(`Kleerkast met id ${id} verwijderen`);
            return kleerkastById;
       
    };
    //kleerkast toevoegen
    const create = async({name,location,userId}) => {
            const existingKleerkast = await kleerkast.findOne({where:{name,location:location,userId:userId}});
            if(existingKleerkast){
                throw ServiceError.validationFailed(`kleerkast met naam ${name} en locatie ${location} bestaat al`,{name,location});
            }
            const existingUser = await user.findByPk(userId);
            if(!existingUser){
                throw ServiceError.notFound(`user met id ${userId} bestaat niet`,{userId});
            }
            const newKleerkast = await kleerkast.create({name,location,userId});
            existingUser.addKleerkasten(newKleerkast);
            debugLog(`Kleerkast ${name} wordt toegevoegd`);
            
            return newKleerkast;
    };
    const belongsToUser = async(Id) => {
        
            const kleerkastById = await kleerkast.findByPk(Id);
            if(!kleerkastById){
                throw ServiceError.notFound(`kleerkast met id ${Id} bestaat niet`,{Id});
            }
            const gebruiker = await kleerkastById.getUser();
            debugLog(`Kleerkast met id ${Id} hoort bij user ${gebruiker.username}`);
            return gebruiker;
    };

    module.exports = { 
        getAll, getKleerkastById, getKledingstukkenByKleerkastId, updateKleerkastById, deleteById, create, belongsToUser
    };