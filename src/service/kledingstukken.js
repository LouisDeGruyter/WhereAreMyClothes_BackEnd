let {KLEDING,KLEERKASTEN} = require('../data/mock-data');
const {getLogger} = require('../core/logging');
const {models:{kledingstuk}} = require('../../models');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
const getAll=()=>{
    debugLog('Alle kledingstukken worden opgehaald');
    return kledingstuk.findAll().then((kledingstukken)=>{
            return kledingstukken;}).catch((error) => {
                debugLog(error);
            });
};


const getKledingstukById=(id)=>{
    debugLog(`Kledingstuk met id ${id} wordt opgehaald`);
    return KLEDING.find(kledingstuk => kledingstuk.id === parseInt(id));

};

const  create =async ({brand,color, type, size,kleerkastId,userId}) => {
    debugLog(`Kledingstuk met merk ${brand}, kleur ${color}, type ${type}, grootte ${size}, kleerkastId ${kleerkastId}n userId ${userId} wordt toegevoegd`);
//     let existingKleerkast;
//     if(kleerkastId){
//         existingKleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === kleerkastId);
//     }
//     if(!existingKleerkast){
//         throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
//     }
// //     if( typeof user ==='string'){
// //         user={
// //         id: Math.floor(Math.random() * 100000),
// //         name:user
// //     }
// // }
try{ const kleding = await kledingstuk.create({ brand:brand,color:color, type:type, size:size,kleerkastId:kleerkastId,userId:userId})
    return kleding;
}catch(error){
    debugLog(error);
}


// const newKledingStuk = {
//     id: Math.max(...KLEDING.map(kledingstuk => kledingstuk.id)) + 1, // id van het laatste kledingstuk + 1
//     color,
//     type,
//     size,
//     kleerkast: existingKleerkast, 
// }
//  KLEDING= [...KLEDING, newKledingStuk];
};
const updateKledingStukById = (id, {color, type, size,kleerkastId}) => {
    debugLog(`Kledingstuk met id ${id} wordt geupdate`);
    let existingKleerkast;
    if(kleerkastId){
        existingKleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === kleerkastId);
    }
    if(!existingKleerkast){
        throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
    }
    let kledingstuk = KLEDING.find(kledingstuk => kledingstuk.id === parseInt(id));
    if(!kledingstuk){
        throw new Error(`kledingstuk met id ${id} bestaat niet`);
    }
    kledingstuk.color = color;
    kledingstuk.type = type;
    kledingstuk.size = size;
    kledingstuk.kleerkast = existingKleerkast;
    // if(user){
    //     kledingstuk.user.name = user;
    // }
    return kledingstuk;
};
const deleteById = (id) => {
    debugLog(`Kledingstuk met id ${id} wordt verwijderd`);
    KLEDING = KLEDING.filter(kledingstuk => kledingstuk.id !== parseInt(id));
};

module.exports = {
    getAll, getKledingstukById, create, updateKledingStukById, deleteById 
};