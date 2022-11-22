let {KLEDING,KLEERKASTEN} = require('../data/mock-data');

const getAll=()=>{
    return {items:KLEDING, count:KLEDING.length};
};


const getKledingstukById=(id)=>{
    return KLEDING.find(kledingstuk => kledingstuk.id === parseInt(id));

};

const create = ({color, type, size,kleerkastId}) => {
    let existingKleerkast;
    if(kleerkastId){
        existingKleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === kleerkastId);
    }
    if(!existingKleerkast){
        throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
    }
//     if( typeof user ==='string'){
//         user={
//         id: Math.floor(Math.random() * 100000),
//         name:user
//     }
// }

const newKledingStuk = {
    id: Math.max(...KLEDING.map(kledingstuk => kledingstuk.id)) + 1, // id van het laatste kledingstuk + 1
    color,
    type,
    size,
    kleerkast: existingKleerkast, 
}
 KLEDING= [...KLEDING, newKledingStuk];
 return newKledingStuk;
};
const updateKledingStukById = (id, {color, type, size,kleerkastId}) => {
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
    KLEDING = KLEDING.filter(kledingstuk => kledingstuk.id !== parseInt(id));
};

module.exports = {
    getAll, getKledingstukById, create, updateKledingStukById, deleteById 
};