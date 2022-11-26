const Router = require('@koa/router');
const kledingstukkenService = require('../service/kledingstukken');


const getKledingstukkken= async(ctx) => { // alle kledingstukken ophalen
    ctx.body=  await kledingstukkenService.getAll();
};

const createKledingstuk= async(ctx) => { // nieuwe kledingstuk toevoegen
ctx.body = await kledingstukkenService.create({...ctx.request.body});
};

const getKledingstukById= async(ctx)=>{ // kledingstuk ophalen op basis van id
ctx.body= await kledingstukkenService.getKledingstukById(ctx.params.id); // id niet geparsed
};

const deleteKLedingstuk = async(ctx)=>{ // kledingstuk verwijderen op basis van id
ctx.body= await kledingstukkenService.deleteById(ctx.params.id);
ctx.status=204; // geen content
};

const updateKledingstuk = async(ctx)=>{ // kledingstuk updaten op basis van id
ctx.body= await kledingstukkenService.updateKledingStukById(ctx.params.id, {...ctx.request.body});
};
const belongsToUser = async(ctx)=>{ //gebruiker ophalen op basis van id
ctx.body= await kledingstukkenService.belongsToUser(ctx.params.id);
};
const belongsToKleerkast = async(ctx)=>{ //kleerkast ophalen op basis van id
ctx.body= await kledingstukkenService.belongsToKleerkast(ctx.params.id);
};



module.exports = (app) => {
    const router = new Router({prefix: '/kledingstukken'});
router.get('/', getKledingstukkken);
router.get('/:id', getKledingstukById);
router.post('/', createKledingstuk);
router.delete('/:id', deleteKLedingstuk);
router.put('/:id', updateKledingstuk);
router.get('/:id/user', belongsToUser);
router.get('/:id/kleerkast', belongsToKleerkast);

app.use(router.routes()).use(router.allowedMethods());

}
