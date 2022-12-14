const {getLogger} = require('../core/logging');
const {models:{kledingstuk,user,kleerkast}} = require('../../models');
const ServiceError = require('../core/serviceError');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
const getAll= async ()=>{
    return await kledingstuk.findAll().then((kledingstukken)=>{
  
            return {kledingstukken:kledingstukken,lengte:kledingstukken.length};
        });
};


const getKledingstukById=async(id)=>{
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw ServiceError.notFound(`kledingstuk met id ${id} bestaat niet`,{id});
        }

        return kledingstukById;
};

const  create =async ({brand,color, type, size,kleerkastId}) => {
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw ServiceError.notFound(`kleerkast met id ${kleerkastId} bestaat niet`,{kleerkastId});
        }
        
        let newKledingstuk = await kledingstuk.create({brand,color, type, size,kleerkastId});
        existingKleerkast.addKledingstukken(newKledingstuk);

        return newKledingstuk;
};
   
const updateKledingStukById = async(id, {brand,color, type, size,kleerkastId}) => {
   
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
           throw ServiceError.notFound(`kledingstuk met id ${id} bestaat niet`,{id});
        }
        let existingKleerkast = await kleerkast.findByPk(kleerkastId);
        if(!existingKleerkast){
            throw ServiceError.notFound(`kleerkast met id ${kleerkastId} bestaat niet`,{kleerkastId});
        }
        let huidigeKleerkast = await kledingstukById.getKleerkast();
        if(huidigeKleerkast.id != kleerkastId){
            huidigeKleerkast.removeKledingstukken(kledingstukById);
            existingKleerkast.addKledingstukken(kledingstukById);
        }
        kledingstukById.brand = brand;
        kledingstukById.color = color;
        kledingstukById.type = type;
        kledingstukById.size = size;
        kledingstukById.kleerkastId = kleerkastId;
        await kledingstukById.save();
        

        return kledingstukById;
};
const deleteById = async (id) => {
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw ServiceError.notFound(`kledingstuk met id ${id} bestaat niet`,{id});
        }
        kledingstukById.destroy();
    
   
};
const belongsToUser = async (id) => {
    
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw ServiceError.notFound(`kledingstuk met id ${id} bestaat niet`,{id});
        }
        const kleerkast1= await kledingstukById.getKleerkast();
        const user1 = await kleerkast1.getUser();

        return user1;
};
const belongsToKleerkast = async (id) => {
   
        let kledingstukById = await kledingstuk.findByPk(id);
        if(!kledingstukById){
            throw ServiceError.notFound(`kledingstuk met id ${id} bestaat niet`,{id});
        }
        const kleerkast1 = await kledingstukById.getKleerkast();

        return kleerkast1;
   
};
        

module.exports = {
    getAll, getKledingstukById, create, updateKledingStukById, deleteById, belongsToUser, belongsToKleerkast
};