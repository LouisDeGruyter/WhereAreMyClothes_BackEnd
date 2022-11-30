const createServer = require('../src/createServer');
const supertest = require('supertest');
const {models:{user,kleerkast,kledingstuk}} = require('../models');
const url = '/api/kledingstukken';

// voor testen zorg dat bij opstarten database wordt gereset (force: true)
const data= {
    kledingstukken: [
        {   kledingstukId: 1,
            brand: 'Nike',
            color: 'zwart',
            type: 'schoenen',
            size: 42,
            kleerkastId: 1
        },
        {   kledingstukId: 2,
            brand: 'Adidas',
            color: 'wit',
            type: 'schoenen',
            size: 43,
            kleerkastId: 1
        },
        {   kledingstukId: 3,
            brand: 'Puma',
            color: 'rood',
            type: 'schoenen',
            size: 44,
            kleerkastId: 1
        },
    ],
    kleerkasten: [
        {   kleerkastId: 1,
            userId: 1,
            name: 'Kleerkast 1',
            location:'mcDonalds',
        },
    ],
    users: [
        {   userId: 1,
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
    
    describe('GET /api/kledingstukken', () => {
        beforeAll(async () => {
            
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
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
            expect(response.body.kledingstukken).toEqual(data.kledingstukken);


        });
    });
    describe('GET /api/kledingstukken/:id', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });

        it('should return 200 and kledingstuk with id 1', async () => {
            const response = await request.get(url + '/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(data.kledingstukken[0]);
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.get(url + '/999');
            expect(response.status).toBe(404);
        });
    });
    describe('POST /api/kledingstukken', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });
        it('should return 200 and create kledingstuk', async () => {
            const response = await request.post(url).send(
                data.kledingstukken[0]
            );
            expect(response.status).toBe(200);
            expect(response.body).toEqual({brand: 'Nike', color: 'zwart', type: 'schoenen', size: 42, kleerkastId: 1, kledingstukId: 4});
        });
        it('should return 500 when brand is missing', async () => {
            const response = await request.post(url).send({
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            });
            expect(response.status).toBe(500);
        });
        it('should return 500 when color is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            });
            expect(response.status).toBe(500);
        });
        it('should return 500 when type is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                size: 42,
                kleerkastId: 1
            });
            expect(response.status).toBe(500);
        });
        it('should return 500 when size is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                kleerkastId: 1
            });
            expect(response.status).toBe(500);
        });
    
});
    describe('PUT /api/kledingstukken/:id', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });
        it('should return 200 and update kledingstuk with id 1', async () => {
            const response = await request.put(url + '/1').send({
                brand: 'aangepastMerk',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                kledingstukId: 1,
                brand: 'aangepastMerk',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            });
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.put(url + '/999').send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            });
            expect(response.status).toBe(404);
        });
    });
    describe('DELETE /api/kledingstukken/:id', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });
        it('should return 204 and delete kledingstuk with id 1', async () => {
            const response = await request.delete(url + '/1');
            expect(response.status).toBe(204);
            const response2 = await request.get(url + '/1');
            expect(response2.status).toBe(404);
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.delete(url + '/999');
            expect(response.status).toBe(404);
        });
    });
        describe('GET /api/kledingstukken/:id/kleerkast', () => {
            beforeAll(async () => {
                await user.bulkCreate(data.users);
                await kleerkast.bulkCreate(data.kleerkasten);
                await kledingstuk.bulkCreate(data.kledingstukken);
            });
            afterAll(async () => {
                await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
                await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
                await user.destroy({where:{userId:dataToDelete.users}});  
                
            });
            it('should return 200 and kleerkast with id 1', async () => {
                const response = await request.get(url + '/1/kleerkast');
                expect(response.status).toBe(200);
                expect(response.body).toEqual(data.kleerkasten[0]);
            });
            it('should return 404 when kleerkast does not exist', async () => {
                const response = await request.get(url + '/999/kleerkast');
                expect(response.status).toBe(404);
            });
        });
        describe('GET /api/kledingstukken/:id/user', () => {
            beforeAll(async () => {
                await user.bulkCreate(data.users);
                await kleerkast.bulkCreate(data.kleerkasten);
                await kledingstuk.bulkCreate(data.kledingstukken);
            });
            afterAll(async () => {
                await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
                await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
                await user.destroy({where:{userId:dataToDelete.users}});  
                
            });
            it('should return 200 and user with id 1', async () => {
                const response = await request.get(url + '/1/user');
                expect(response.status).toBe(200);
                expect(response.body).toEqual(data.users[0]);
            });
            it('should return 404 when user does not exist', async () => {
                const response = await request.get(url + '/999/user');
                expect(response.status).toBe(404);
            });
        });

});


