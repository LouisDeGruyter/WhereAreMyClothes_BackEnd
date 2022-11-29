const createServer = require('../src/createServer');
const supertest = require('supertest');
const {models:{user,kleerkast,kledingstuk}} = require('../models');


const data= {
    kedingstukken: [
        {   id: 1,
            brand: 'Nike',
            color: 'zwart',
            type: 'schoenen',
            size: 42,
            kleerkastId: 1
        },
        {   id: 2,
            brand: 'Adidas',
            color: 'wit',
            type: 'schoenen',
            size: 43,
            kleerkastId: 1
        },
        {   id: 3,
            brand: 'Puma',
            color: 'rood',
            type: 'schoenen',
            size: 44,
            kleerkastId: 1
        },
    ],
    kleerkasten: [
        {   id: 1,
            userId: 1,
            naam: 'Kleerkast 1',
            location:'mcDonalds',
        },
    ],
    users: [
        {   id: 1,
            username: 'test',
            password: 'test',
            email: 'test@gmail.com',
        },
    ],
};

    const dataToDelete = {
        kledingstukken: [1,2,3,],
        kleerkasten: [1],
        users: [1],
    };
        

describe('kledingstukken', () => {
    let server;
    let request
    beforeAll(async () => {
        server = await createServer();
        request = supertest(server.getApp().callback());
    });
    afterAll(async () => {
        await server.stop();
    });
    const url = '/api/kledingstukken';
    describe('GET /api/kledingstukken', () => {
        beforeAll(async () => {
            await Promise.all(data.users.map(gebruiker => user.create(gebruiker)));
            await Promise.all(data.kleerkasten.map(kleerkast1 => kleerkast.create(kleerkast1)));
            await Promise.all(data.kedingstukken.map(kledingstuk1 => kledingstuk.create(kledingstuk1)));
        });
        afterAll(async () => {
            await Promise.all(dataToDelete.users.map(gebruiker => user.findByPk(gebruiker.id).then(gebruiker => gebruiker.destroy())));
            await Promise.all(dataToDelete.kleerkasten.map(kleerkast1 => kleerkast.findByPk(kleerkast1.id).then(kleerkast1 => kleerkast1.destroy())));
            await Promise.all(dataToDelete.kedingstukken.map(kledingstuk1 => kledingstuk.findByPk(kledingstuk1.id).then(kledingstuk1 => kledingstuk1.destroy())));
        });
        it('should return 200 and all kledingstukken', async () => {
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(3);


        })});
 });





