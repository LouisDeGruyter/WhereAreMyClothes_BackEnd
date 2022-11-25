 const {getLogger} = require('../core/logging');
 const {models:{kledingstuk,user,kleerkast}} = require('../../models');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
 //ophalen van alle kleerkasten
 const getAll = async() => {
        return await kleerkast.findAll().then((kleerkasten)=>{
            debugLog('Alle kleerkasten worden opgehaald');
            return kleerkasten;}
        ).catch((error) => {
            debugLog(error);
        });
    };
    
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = async(id) => {
        try{
            let kleerkastById = await kleerkast.findByPk(id);
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
        debugLog(`Kledingstukken van kleerkast met id ${kleerkastId} worden opgehaald`);
        // to be implemented
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
    const create = async({name,location}) => {
        try{
            const existingKleerkast = await kleerkast.findOne({where:{name,location:location}});
            if(existingKleerkast){
                throw new Error(`kleerkast met naam ${name} en locatie ${location} bestaat al`);
            }
            const newKleerkast = await kleerkast.create({name,location});
            debugLog(`Kleerkast ${name} wordt toegevoegd`);
            return newKleerkast;
        }catch(error){
            debugLog(error);
        }
    };
    module.exports = { 
        getAll, getKleerkastById, getKledingstukkenByKleerkastId, updateKleerkastById, deleteById, create
    };