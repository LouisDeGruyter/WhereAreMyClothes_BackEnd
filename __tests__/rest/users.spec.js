const {withServer} = require('../helpers');
const {models:{user,kleerkast,kledingstuk}} = require('../../models');

const url = '/api/users';

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
        
    ],
    users: [
        {   userId: 1,
            username: process.env.AUTH_TEST_USER_USERNAME,
            auth0id: process.env.AUTH_TEST_USER_USER_ID,
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
                
            ],

                
        },
        {   userId: 2,
            username: 'test2',
            auth0id: 'test2',
            kleerkasten: []
        }
    ],
};

    const dataToDelete = {
        kledingstukken: [1,2,3,],
        kleerkasten: [1],
        users: [1,2],
    };
        

describe('users', () => {
    let authHeader;
    let request
   withServer(({request: req, authHeader: auth}) => {
        request = req;
        authHeader = auth;
    });
    
    describe('GET /api/users', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 200 and users', async () => {
            const response = await request.get(url).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({users:data.users,lengte:2});
        });
    });
    describe('GET /api/users/:userId', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 200 and user', async () => {
            const response = await request.get(`${url}/1`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(data.users[0]);
            
        });
        it('should return 404 when user not found', async () => {
            const response = await request.get(`${url}/3`).set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });
    });
    // describe('POST /api/users', () => {
    //     let usersToDelete = [];
    //     beforeAll(async () => {
    //         await user.bulkCreate(data.users);
    //         await kleerkast.bulkCreate(data.kleerkasten);
    //         await kledingstuk.bulkCreate(data.kledingstukken);
    //     });
    //     afterAll(async () => {
    //         await user.destroy({where: {userId: dataToDelete.users}});
    //         await user.destroy({where: {userId: usersToDelete}});
    //         await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
    //         await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
    //     });
    //     it('should return 201 and user', async () => {
    //         const response = await request.post(url).send({
    //             username: 'test3',
    //             password: 'test3',
    //             email: 'test3@gmail.com',
    //         }).set('Authorization', authHeader);
    //         expect(response.status).toBe(201);
    //         expect(response.body.username).toBe('test3');
    //         expect(response.body.password).toBe('test3');
    //         expect(response.body.email).toBe('test3@gmail.com');
    //         expect(response.body.userId).toBeTruthy();
    //         usersToDelete.push(response.body.userId).set('Authorization', authHeader);
    //     });
    //     it('should return 400 when username is missing', async () => {
    //         const response = await request.post(url).send({
    //             password: 'test3',
    //             email: 'test3@gmail.com',
    //         }).set('Authorization', authHeader);
    //         expect(response.status).toBe(400);
    //     });
    //     it('should return 400 when password is missing', async () => {
    //         const response = await request.post(url).send({
    //             username: 'test3',
    //             email: 'test3@gmail.com',
    //         });
    //         expect(response.status).toBe(400);
    //     });
    //     it('should return 400 when email is missing', async () => {
    //         const response = await request.post(url).send({
    //             username: 'test3',
    //             password: 'test3',
    //         });
    //         expect(response.status).toBe(400);
    //     });
    //     it('should return 400 when email is not unique', async () => {
    //         const response = await request.post(`${url}`).send({
    //             username: 'gewijzigd',
    //             password: 'gewijzigd',
    //             email: 'test2@gmail.com',
    //         });
    //         expect(response.status).toBe(400);
    //     });
    // });
    describe('PUT /api/users/:userId', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 200 and user', async () => {
            const response = await request.put(`${url}/1`).send({
                username: 'gewijzigd',
             
            }).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.username).toBe('gewijzigd');
            expect(response.body.userId).toBeTruthy();
        });
        it('should return 400 when username is missing', async () => {
            const response = await request.put(`${url}/1`).send({
            }).set('Authorization', authHeader);
            expect(response.status).toBe(400);
        });

        it('should return 404 when user not found', async () => {
            const response = await request.put(`${url}/99`).send({
                username: 'gewijzigd',
            }).set('Authorization', authHeader);
            expect(response.status).toBe(404);
        });

    });
    describe('DELETE /api/users/:userId', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 204', async () => {
            const response = await request.delete(`${url}/1`).set('Authorization', authHeader);
            expect(response.status).toBe(204);
        });
        it('should return 404 when user not found', async () => {
            const response = await request.delete(`${url}/99`).set('Authorization', "geen betaande auth header");
            expect(response.status).toBe(404);
        });
    });
    describe('GET /api/users/:userId/kleerkasten', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 200 and kleerkasten', async () => {
            const response = await request.get(`${url}/1/kleerkasten`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.lengte).toEqual(1);
            expect(response.body.kleerkasten).toEqual(data.kleerkasten)
        });
        
    });
    describe('GET /api/users/:userId/kledingstukken', () => {
        beforeAll(async () => {
            await user.bulkCreate(data.users);
            await kleerkast.bulkCreate(data.kleerkasten);
            await kledingstuk.bulkCreate(data.kledingstukken);
        });
        afterAll(async () => {
            await user.destroy({where: {userId: dataToDelete.users}});
            await kleerkast.destroy({where: {kleerkastId: dataToDelete.kleerkasten}});
            await kledingstuk.destroy({where: {kledingstukId: dataToDelete.kledingstukken}});
        });
        it('should return 200 and kledingstukken', async () => {
            const response = await request.get(`${url}/1/kledingstukken`).set('Authorization', authHeader);
            expect(response.status).toBe(200);
            expect(response.body.lengte).toEqual(3);
            expect(response.body.kledingstukken).toEqual(data.kledingstukken);
        });
    });

});