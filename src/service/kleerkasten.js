 let {KLEERKASTEN,KLEDING} = require('../data/mock-data');
 const {getLogger} = require('../core/logging');
const debugLog = (message, meta = {}) => {
    if(!this.logger) this.logger= getLogger();
    this.logger.debug(message, meta);
};
 //ophalen van alle kleerkasten
    const getAll = () => {
        debugLog("Alle kleerkasten ophalen");
        return {items:KLEERKASTEN, count:KLEERKASTEN.length};
    };
    //ophalen van een kleerkast op basis van id
    const getKleerkastById = (id) => {
        debugLog(`Kleerkast met id ${id} ophalen`);
        let kleerkastMetId = KLEERKASTEN.find(kleerkast => kleerkast.id === parseInt(id));
        if(!kleerkastMetId){
            throw new Error(`kleerkast met id ${id} bestaat niet`);
        }
        return kleerkastMetId;
    };
    //update kleerkast op basis van id
    const updateKleerkast = (id, {name,location}) => {
        debugLog(`Kleerkast met id ${id} updaten`);
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
        debugLog(`Kledingstukken van kleerkast met id ${kleerkastId} ophalen`);
        let kleerkast = KLEERKASTEN.find(kleerkast => kleerkast.id === parseInt(kleerkastId));
        if(!kleerkast){
            throw new Error(`kleerkast met id ${kleerkastId} bestaat niet`);
        }
        const lijstMetKledingstukken = KLEDING.filter(kledingstuk => kledingstuk.kleerkast.id === parseInt(kleerkastId));
        return {items:lijstMetKledingstukken, count:lijstMetKledingstukken.length};
    };
    
    
    //kleerkast verwijderen op basis van id
    const deleteById = (id) => {
        debugLog(`Kleerkast met id ${id} verwijderen`);
        KLEERKASTEN = KLEERKASTEN.filter(kleerkast => kleerkast.id !== parseInt(id));
        KLEDING = KLEDING.filter(kledingstuk => kledingstuk.kleerkast.id !== parseInt(id));
    };
    //kleerkast toevoegen
    const create = ({name,location}) => {
        debugLog(`Kleerkast ${name} en locatie ${location} toevoegen`);
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