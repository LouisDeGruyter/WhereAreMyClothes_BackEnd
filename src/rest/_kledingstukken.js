const Router = require('@koa/router');
const kledingstukkenService = require('../service/kledingstukken');


const getKledingstukkken= async(ctx) => { // alle kledingstukken ophalen
    ctx.body= kledingstukkenService.getAll();
};

const createKledingstuk= async(ctx) => { // nieuwe kledingstuk toevoegen
ctx.body = kledingstukkenService.create({...ctx.request.body});
};

const getKledingstukById= async(ctx)=>{ // kledingstuk ophalen op basis van id
console.log(ctx.params.id);
console.log(kledingstukkenService.getKledingstukById(ctx.params.id));
ctx.body= kledingstukkenService.getKledingstukById(ctx.params.id); // id niet geparsed
};

const deleteKLedingstuk = async(ctx)=>{ // kledingstuk verwijderen op basis van id
ctx.body= kledingstukkenService.deleteById(ctx.params.id);
ctx.status=204; // geen content
};

const updateKledingstuk = async(ctx)=>{ // kledingstuk updaten op basis van id
ctx.body= kledingstukkenService.updateKledingStukById(ctx.params.id, {...ctx.request.body});
};


module.exports = (app) => {
    const router = new Router({prefix: '/kledingstukken'});
router.get('/', getKledingstukkken);
router.get('/:id', getKledingstukById);
router.post('/', createKledingstuk);
router.delete('/:id', deleteKLedingstuk);
router.put('/:id', updateKledingstuk);

app.use(router.routes()).use(router.allowedMethods());

}
