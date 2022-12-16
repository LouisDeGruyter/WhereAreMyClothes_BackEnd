const {withServer} = require('../helpers');
const {models:{user,kleerkast,kledingstuk}} = require('../../models');

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
            username: process.env.AUTH_TEST_USER_USERNAME,
            auth0Id: process.env.AUTH_TEST_USER_USER_ID,
        },
    ],
};

    const dataToDelete = {
        kledingstukken: [1,2,3,],
        kleerkasten: [1],
        users: [1],
    };
        

describe('kledingstukken', () => {
    let authHeader;
    let request
   withServer(({request: req, authHeader: auth}) => {
        request = req;
        authHeader = auth;
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
            const response = await request.get(url).set('Authorization', authHeader);
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
            const response = await request.get(url + '/1').set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(data.kledingstukken[0]);
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.get(url + '/999').set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });
    });
    describe('POST /api/kledingstukken', () => {
        let kledingstukkenToDelete = [];
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await kledingstuk.destroy({where:{kledingstukId:kledingstukkenToDelete}});
            await kledingstuk.destroy({where:{kledingstukId:dataToDelete.kledingstukken}});
            await kleerkast.destroy({where:{kleerkastId:dataToDelete.kleerkasten}});
            await user.destroy({where:{userId:dataToDelete.users}});  
            
        });
        it('should return 201 and create kledingstuk', async () => {
            const response = await request.post(url).send(
                data.kledingstukken[0]
            ).set('Authorization', authHeader);
            expect(response.status).toBe(201);
            expect(response.body.kledingstukId).toBeTruthy();
            expect (response.body.brand).toBe(data.kledingstukken[0].brand);
            expect (response.body.color).toBe(data.kledingstukken[0].color);
            expect (response.body.type).toBe(data.kledingstukken[0].type);
            expect (response.body.size).toBe(data.kledingstukken[0].size);
            expect (response.body.kleerkastId).toBe(data.kledingstukken[0].kleerkastId);
            kledingstukkenToDelete.push(response.body.kledingstukId);

        });
        it('should return 400 when brand is missing', async () => {
            const response = await request.post(url).send({
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when color is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when type is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when size is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when kleerkastId is missing', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 404 when kleerkastId does not exist', async () => {
            const response = await request.post(url).send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 999
            }).set('Authorization', authHeader);
            expect(response.status).toBe(404);
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
            }).set('Authorization', authHeader);
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
        it('should return 404 when kleerkast does not exist', async () => {
            const response = await request.put(url + '/1').send({
                brand: 'aangepastMerk',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 999
            }).set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.put(url + '/999').send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });
        it('should return 400 when brand is missing', async () => {
            const response = await request.put(url + '/1').send({
                color: 'zwart',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when color is missing', async () => {
            const response = await request.put(url + '/1').send({
                brand: 'Nike',
                type: 'schoenen',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        }
        );
        it('should return 400 when type is missing', async () => {
            const response = await request.put(url + '/1').send({
                brand: 'Nike',
                color: 'zwart',
                size: 42,
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });
        it('should return 400 when size is missing', async () => {
            const response = await request.put(url + '/1').send({
                brand: 'Nike',
                color: 'zwart',
                type: 'schoenen',
                kleerkastId: 1
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
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
            const response = await request.delete(url + '/1').set('Authorization', authHeader);
            expect(response.status).toBe(204);
        });
        it('should return 404 when kledingstuk does not exist', async () => {
            const response = await request.delete(url + '/999').set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });
        it('should return 404 for deleted kledingstuk', async () => {
            const response = await request.get(url + '/1').set('Authorization', authHeader);
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
                const response = await request.get(url + '/1/kleerkast').set('Authorization', authHeader);
                expect(response.status).toBe(200);
                expect(response.body).toEqual(data.kleerkasten[0]);
            });
            it('should return 404 when kleerkast does not exist', async () => {
                const response = await request.get(url + '/999/kleerkast').set('Authorization', authHeader);
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
                const response = await request.get(url + '/1/user').set('Authorization', authHeader);
                expect(response.status).toBe(200);
                expect(response.body).toEqual(data.users[0]);
            });
            it('should return 404 when user does not exist', async () => {
                const response = await request.get(url + '/999/user').set('Authorization', authHeader);
                expect(response.status).toBe(404);
            });
        });

});


