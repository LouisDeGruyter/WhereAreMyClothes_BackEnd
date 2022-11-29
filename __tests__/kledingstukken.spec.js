const createServer = require('../src/createServer');
const supertest = require('supertest');
const {models:{user,kleerkast,kledingstuk}} = require('../models');

// voor testen zorg dat bij opstarten database wordt gereset (force: true)
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
            name: 'Kleerkast 1',
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
            
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kedingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });
        it('should return 200 and all kledingstukken', async () => {
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.body.lengte).toBe(3);


        });
    });
});


