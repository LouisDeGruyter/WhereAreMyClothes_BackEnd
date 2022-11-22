const Router = require('@koa/router');
const kleerkastenService = require('../service/kleerkasten');


// alle kleerkasten ophalen
const getKleerkasten = async(ctx) => {
    ctx.body = kleerkastenService.getAll();
};
// nieuwe kleerkast toevoegen
const createKleerkast = async(ctx) => {
    ctx.body = kleerkastenService.create({...ctx.request.body});
};
// kleerkast ophalen op basis van id
const getKleerkastById = async(ctx) => {
    ctx.body = kleerkastenService.getKleerkastById(ctx.params.id);
};
// kleerkast verwijderen op basis van id
const deleteKleerkast = async(ctx) => {
    ctx.body = kleerkastenService.deleteById(ctx.params.id);
    ctx.status = 204; // geen content
};
// kleerkast updaten op basis van id
const updateKleerkast = async(ctx) => {
    ctx.body = kleerkastenService.updateKleerkastById(ctx.params.id, ctx.request.body);
};
// kledingstukken van de kleerkast ophalen op basis van id
const getKledingstukkenByKleerkastId = async(ctx) => {
    ctx.body = kleerkastenService.getKledingstukkenByKleerkastId(ctx.params.id);
}; 

module.exports = (app) => {
    const router = new Router({prefix: '/kleerkasten'});
    router.get('/', getKleerkasten);
    router.get('/:id', getKleerkastById);
    router.post('/', createKleerkast);
    router.delete('/:id', deleteKleerkast);
    router.put('/:id', updateKleerkast);
    router.get('/:id/kledingstukken', getKledingstukkenByKleerkastId);
    app.use(router.routes()).use(router.allowedMethods());
}