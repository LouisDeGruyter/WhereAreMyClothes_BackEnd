let {KLEDING,KLEERKASTEN} = require('../data/mock-data');
const {getLogger} = require('../core/logging');
const {models:{kledingstuk,user,kleerkast}} = require('../../models');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
const getAll= async ()=>{
    return await kledingstuk.findAll().then((kledingstukken)=>{
        debugLog('Alle kledingstukken worden opgehaald');
            return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
        }).catch((error) => {
                debugLog(error);
            });
};


const getKledingstukById=async(id)=>{
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        debugLog(`Kledingstuk met id ${id} wordt opgehaald`);
        return kledingstukById;
    }
    catch(error){
        debugLog(error);
    }
};
const  create =async ({brand,color, type, size,kleerkastId,userId}) => {
    try{
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        let existingUser = await user.findByPk(userId);
        if(!existingUser){
            throw new Error(`user met id ${userId} bestaat niet`);
        }
        let newKledingstuk = await kledingstuk.create({brand,color, type, size,kleerkastId,userId});
        existingKleerkast.addKledingstukken(newKledingstuk);
        existingUser.addKledingstukken(newKledingstuk);
        debugLog(`Kledingstuk met merk ${brand}, kleur ${color}, type ${type} en maat ${size} wordt aangemaakt`);
        return newKledingstuk;
    }
    catch(error){
        debugLog(error);
    }
};
   
const updateKledingStukById = async(id, {brand,color, type, size,kleerkastId,userId}) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
       
        if(userId){
            let existingUser = await user.findByPk(userId);
            if(!existingUser){
                throw new Error(`user met id ${userId} bestaat niet`);
                
        }  
        kledingstukById.userId = userId;   
        }
        kledingstukById.color = color;
        kledingstukById.type = type;
        kledingstukById.size = size;
        kledingstukById.kleerkastId = kleerkastId;
        kledingstukById.brand=brand;
        await kledingstukById.save();
        
        debugLog(`Kledingstuk met id ${id} updaten`);
        return kledingstukById;
    } catch(error){
        debugLog(error);
    }
};
const deleteById = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        return kledingstukById.destroy();
    } catch(error){
        debugLog(error);
    }
   
};
const belongsToUser = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        const user = await kledingstukById.getUser();
        debugLog(`Kledingstuk met id ${id} hoort bij user met id ${user.id}`);
        return user;
    } catch(error){
        debugLog(error);
    }
};
const belongsToKleerkast = async (id) => {
    try{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw new Error(`kledingstuk met id ${id} bestaat niet`);
        }
        const kleerkast1 = await kledingstukById.getKleerkast();
        debugLog(`Kledingstuk met id ${id} hoort bij kleerkast met id ${kleerkast1.id}`);
        return kleerkast1;
    } catch(error){
        debugLog(error);
    }
};
        

module.exports = {
    getAll, getKledingstukById, create, updateKledingStukById, deleteById, belongsToUser, belongsToKleerkast
};