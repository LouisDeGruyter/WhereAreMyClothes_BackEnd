const createServer = require('../../src/createServer');
const supertest = require('supertest');
const {models:{user,kleerkast,kledingstuk}} = require('../../models');
const url = '/api/kleerkasten';

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
            ]
        },
        {   kleerkastId: 2,
            userId: 1,
            name: 'Kleerkast 2',
            location:'Burger King',
            kledingstukken: [
            ],
        },
        
    ],
    users: [
        {   userId: 1,
            username: 'test',
            password: 'test',
            email: 'test@gmail.com',
        },
        {   userId: 2,
            username: 'test2',
            password: 'test2',
            email: 'test2@gmail.com',
        },
    ],
};

    const dataToDelete = {
        kledingstukken: [1,2,3],
        kleerkasten: [1],
        users: [1,2],
    };
describe('kleerkasten', () => {
    let server;
    let request
    beforeAll(async () => {
        server = await createServer();
        request = supertest(server.getApp().callback());
        
    });
    afterAll(async () => {
        await server.stop();
    });
    describe('GET /api/kleerkasten', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should return all kleerkasten and 200', async () => {
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.body.kleerkasten).toEqual(data.kleerkasten);
        });
    });
    describe('GET /api/kleerkasten/:kleerkastId', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should return kleerkast with kleerkastId 1 and 200', async () => {
            const response = await request.get(`${url}/1`);
            expect(response.status).toBe(200);
            expect(response.body.location).toBe('mcDonalds');
            expect(response.body.name).toBe('Kleerkast 1');
            expect(response.body.userId).toBe(1);
            expect(response.body.kleerkastId).toBeTruthy();
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.get(`${url}/99`);
            expect(response.status).toBe(404);
        }
        );
    });
    describe('POST /api/kleerkasten', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should return kleerkast with kleerkastId 3 and 201', async () => {
            const response = await request.post(url).send({
                userId: 1,
                name: 'Kleerkast 3',
                location:'badkamer',
            });
            expect(response.status).toBe(201);
            expect(response.body.location).toBe('badkamer');
            expect(response.body.name).toBe('Kleerkast 3');
            expect(response.body.userId).toBe(1);
            expect(response.body.kleerkastId).toBeTruthy();
        });
        it('should return 404 when userId does not exist', async () => {
            const response = await request.post(url).send({
                userId: 99,
                name: 'Kleerkast 2',
                location:'badkamer',
            });
            expect(response.status).toBe(404);
        });
        it('should return 400 when name is not provided', async () => {
            const response = await request.post(url).send({
                userId: 1,
                location:'badkamer',
            });
            expect(response.status).toBe(400);
        });
        it('should return 400 when location is not provided', async () => {
            const response = await request.post(url).send({
                userId: 1,
                name: 'Kleerkast 2',
            });
            expect(response.status).toBe(400);
        }
        );
        it('should return 404 when user does not exist', async () => {
            const response = await request.post(url).send({
                userId: 99,
                name: 'Kleerkast 2',
                location:'badkamer',
            });
            expect(response.status).toBe(404);
        });
        it('should return 400 if kleerkast already exists', async () => {
            const response = await request.post(url).send({
                userId: 1,
                name: 'Kleerkast 1',
                location:'mcDonalds',
            });
            expect(response.status).toBe(400);
        });
    });
    describe('PUT /api/kleerkasten/:kleerkastId', () => {
        let kleerkastToDelete=[];
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {     
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await kleerkast.destroy({ where: { kleerkastId: kleerkastToDelete } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });

        it('should return 400 if kleerkast already exists', async () => {
            const response = await request.put(`${url}/2`).send({
                userId: 1,
                name: 'Kleerkast 1',
                location:'mcDonalds',
            });
            expect(response.status).toBe(400);
        });
        it('should return kleerkast with kleerkastId 2 and 200', async () => {
            const response = await request.put(`${url}/1`).send({
                userId: 2,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
            kleerkastToDelete.push(response.body.kleerkastId);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                kleerkastId: 1,
                userId: 2,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
        });
        it('should return kleerkast with kleerkastId 1 and 200', async () => {
            const response = await request.put(`${url}/1`).send({
                userId: 1,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
            kleerkastToDelete.push(response.body.kleerkastId);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                kleerkastId: 1,
                userId: 1,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.put(`${url}/99`).send({
                userId: 1,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
            expect(response.status).toBe(404);
        });
        it('should return 400 when name is not provided', async () => {
            const response = await request.put(`${url}/1`).send({
                userId: 1,
                location:'veranderde locatie',
            });
            expect(response.status).toBe(400);
        }
        );
        it('should return 400 when location is not provided', async () => {
            const response = await request.put(`${url}/1`).send({
                userId: 1,
                name: 'veranderde kleerkast',
            });
            expect(response.status).toBe(400);
        }
        );
        it('should return 404 when user does not exist', async () => {
            const response = await request.put(`${url}/1`).send({
                userId: 99,
                name: 'veranderde kleerkast',
                location:'veranderde locatie',
            });
            expect(response.status).toBe(404);
        });
    });
    describe('DELETE /api/kleerkasten/:kleerkastId', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should not be able to return kleerkast with kleerkastId 1 and status should be 204', async () => {
            const response = await request.delete(`${url}/1`);
            expect(response.status).toBe(204);
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.delete(`${url}/99`);
            expect(response.status).toBe(404);
        });
        it('should not be able to return deleted item', async () => {
            const response = await request.get(`${url}/1`);
            expect(response.status).toBe(404);
        });
    });
    describe('GET /api/kleerkasten/:kleerkastId/kledingstukken', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should return kledingstukken with kleerkastId 1 and 200', async () => {
            const response = await request.get(`${url}/1/kledingstukken`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({kledingstukken:data.kleerkasten[0].kledingstukken,lengte:3});
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.get(`${url}/99/kledingstukken`);
            expect(response.status).toBe(404);
        });
    });
    describe('GET /api/kleerkasten/:kleerkastId/user', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
            await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
            await user.destroy({ where: { userId: dataToDelete.users } });
        });
        it('should return user and 200', async () => {
            const response = await request.get(`${url}/1/user`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(data.users[0]);
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.get(`${url}/99/user`);
            expect(response.status).toBe(404);
        });

    });
    
});
