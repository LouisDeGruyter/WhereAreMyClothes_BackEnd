 let {KLEERKASTEN,KLEDING} = require('../data/mock-data');
 //ophalen van alle kleerkasten
    const getAll = () => {
        return {items:KLEERKASTEN, count:KLEERKASTEN.length};
    };
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = (id) => {
        let kleerkastMetId = KLEERKASTEN.find(kleerkast => kleerkast.id === parseInt(id));
        if(!kleerkastMetId){
            throw new Error(`kleerkast met id ${id} bestaat niet`);
        }
        return kleerkastMetId;
    };
    //update kleerkast op basis van id
    const updateKleerkast = (id, {name,location}) => {
        let kleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === parseInt(id));
        if(!kleerkast){
            throw new Error(`kleerkast met id ${id} bestaat niet`);
        }
        kleerkast.name = name;
        kleerkast.location = location;
        return kleerkast;
    };
    //ophalen van alle kledingstukken van een kleerkast
    const getKledingstukkenByKleerkastId = (kleerkastId) => {
        let kleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === parseInt(kleerkastId));
        if(!kleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        const lijstMetKledingstukken = KLEDING.filter(kledingstuk => kledingstuk.kleerkast.id === parseInt(kleerkastId));
        return {items:lijstMetKledingstukken, count:lijstMetKledingstukken.length};
    };
    
    
    //kleerkast verwijderen op basis van id
    const deleteById = (id) => {
        KLEERKASTEN = KLEERKASTEN.filter(kleerkast => kleerkast.id !== parseInt(id));
        KLEDING = KLEDING.filter(kledingstuk => kledingstuk.kleerkast.id !== parseInt(id));
    };
    //kleerkast toevoegen
    const create = ({name,location}) => {
        const newKleerkast = {
            id: Math.max(...KLEERKASTEN.map(kleerkast => kleerkast.id)) + 1, // id van de laatste kleerkast + 1
            name,
            location,
        }
        KLEERKASTEN = [...KLEERKASTEN, newKleerkast];
        return newKleerkast;
    };
    module.exports = { 
        getAll, getKleerkastById, getKledingstukkenByKleerkastId, updateKleerkast, deleteById, create
    };