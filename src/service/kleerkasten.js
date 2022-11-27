 const {getLogger} = require('../core/logging');
 const {models:{kleerkast,user}} = require('../../models');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
 //ophalen van alle kleerkasten
 const getAll = async() => {
        return await kleerkast.findAll({include:['kledingstukken']}).then((kleerkasten)=>{
            debugLog('Alle kleerkasten worden opgehaald');
            return {kleerkasten:kleerkasten, lengte:kleerkasten.length};}
        ).catch((error) => {
            debugLog(error);
        });
    };
    
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = async(id) => {
        try{
            let kleerkastById = await kleerkast.findByPk(id,{include:['kledingstukken']});
        if(!kleerkastById){
            throw new Error(`kleerkast met id ${id} bestaat niet`);
        }
            debugLog(`Kleerkast met id ${id} wordt opgehaald`);
            return kleerkastById;
        }
        catch(error){
            debugLog(error);
        }
    };
    //update kleerkast op basis van id
    const updateKleerkastById = async (id, {name,location}) => {
        
        let kleerkastById = await kleerkast.findByPk(id);
        if(!kleerkastById){
            throw new Error(`kleerkast met id ${id} bestaat niet`);
        }
        kleerkastById.name = name;
        kleerkastById.location = location;
        debugLog(`Kleerkast met id ${id} updaten`);
        return await kleerkastById.save();
    };
    //ophalen van alle kledingstukken van een kleerkast
    const getKledingstukkenByKleerkastId = async(kleerkastId) => {
       try{
        let kleerkastById = await kleerkast.findByPk(kleerkastId);
        if(!kleerkastById){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        const kleding =  await kleerkastById.getKledingstukken();
            debugLog(`Kledingstukken van kleerkast met id ${kleerkastId} worden opgehaald`);
            return {kledingstukken: kleding, lengte: kleding.length};
        
       }catch(error){
           debugLog(error);
       }
    };
    
    
    //kleerkast verwijderen op basis van id
    const deleteById = async (id) => {
        try{
            let kleerkastById = await kleerkast.findByPk(id);
            if(!kleerkastById){
                throw new Error(`kleerkast met id ${id} bestaat niet`);
            }
            kleerkastById.destroy();
            debugLog(`Kleerkast met id ${id} verwijderen`);
            return kleerkastById;
        }catch(error){
            debugLog(error);
        }
       
    };
    //kleerkast toevoegen
    const create = async({name,location,userId}) => {
        try{
            const existingKleerkast = await kleerkast.findOne({where:{name,location:location,userId:userId}});
            if(existingKleerkast){
                throw new Error(`kleerkast met naam ${name} en locatie ${location} bestaat al`);
            }
            const existingUser = await user.findByPk(userId);
            if(!existingUser){
                throw new Error(`user met id ${userId} bestaat niet`);
            }
            const newKleerkast = await kleerkast.create({name,location,userId});
            existingUser.addKleerkasten(newKleerkast);
            debugLog(`Kleerkast ${name} wordt toegevoegd`);
            
            return newKleerkast;
        }catch(error){
            debugLog(error);
        }
    };
    const belongsToUser = async(Id) => {
        try{
            const kleerkastById = await kleerkast.findByPk(Id);
            if(!kleerkastById){
                throw new Error(`kleerkast met id ${Id} bestaat niet`);
            }
            const gebruiker = await kleerkastById.getUser();
            debugLog(`Kleerkast met id ${Id} hoort bij user ${gebruiker.username}`);
            return gebruiker;
        }catch(error){
            debugLog(error);
        }
    };

    module.exports = { 
        getAll, getKleerkastById, getKledingstukkenByKleerkastId, updateKleerkastById, deleteById, create, belongsToUser
    };