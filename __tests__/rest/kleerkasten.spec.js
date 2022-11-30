// const createServer = require('../../src/createServer');
// const supertest = require('supertest');
// const {models:{user,kleerkast,kledingstuk}} = require('../../models');
// const url = '/api/kleerkasten';

// const data= {
//     kledingstukken: [
//         {   kledingstukId: 4,
//             brand: 'Nike',
//             color: 'zwart',
//             type: 'schoenen',
//             size: 42,
//             kleerkastId: 2
//         },
//         {   kledingstukId: 5,
//             brand: 'Adidas',
//             color: 'wit',
//             type: 'schoenen',
//             size: 43,
//             kleerkastId: 2
//         },
//         {   kledingstukId: 6,
//             brand: 'Puma',
//             color: 'rood',
//             type: 'schoenen',
//             size: 44,
//             kleerkastId: 2
//         },
//     ],
//     kleerkasten: [
//         {   kleerkastId: 2,
//             userId: 2,
//             name: 'Kleerkast 1',
//             location:'mcDonalds',
//         },
//     ],
//     users: [
//         {   userId: 2,
//             username: 'test',
//             password: 'test',
//             email: 'test@gmail.com',
//         },
//     ],
// };

//     const dataToDelete = {
//         kledingstukken: [4,5,6,],
//         kleerkasten: [2],
//         users: [2],
//     };
// describe('kleerkasten', () => {
//     let server;
//     let request
//     beforeAll(async () => {
//         server = await createServer();
//         request = supertest(server.getApp().callback());
//     });
//     afterAll(async () => {
//         await server.close();
//     });
//     describe('GET /api/kleerkasten', () => {
//         beforeAll(async () => {
//             try{
//             await user.bulkCreate(data.users);
//             await kleerkast.bulkCreate(data.kleerkasten);
//             await kledingstuk.bulkCreate(data.kledingstukken);
//             }catch(error){
//                 console.log(error);
//             }

//         });
//         afterAll(async () => {
//             await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
//             await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
//             await user.destroy({ where: { userId: dataToDelete.users } });
//         });
//         it('should return all kleerkasten and 200', async () => {
//             const response = await request.get(url);
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(data.kleerkasten);
//         });
//     });
//     describe('GET /api/kleerkasten/:kleerkastId', () => {
//         beforeAll(async () => {
//             await user.bulkCreate(data.users);
//             await kleerkast.bulkCreate(data.kleerkasten);
//             await kledingstuk.bulkCreate(data.kledingstukken);
//         });
//         afterAll(async () => {
//             await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
//             await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
//             await user.destroy({ where: { userId: dataToDelete.users } });
//         });
//         it('should return kleerkast with kleerkastId 1 and 200', async () => {
//             const response = await request.get(`${url}/1`);
//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(data.kleerkasten[0]);
//         });
//         it('should return 404 when kleerkastId does not exist', async () => {
//             const response = await request.get(`${url}/2`);
//             expect(response.status).toBe(404);
//         }
//         );
//     });
//     describe('POST /api/kleerkasten', () => {
//         beforeAll(async () => {
//             await user.bulkCreate(data.users);
//             await kleerkast.bulkCreate(data.kleerkasten);
//             await kledingstuk.bulkCreate(data.kledingstukken);
//         });
//         afterAll(async () => {
//             await kledingstuk.destroy({ where: { kledingstukId: dataToDelete.kledingstukken } });
//             await kleerkast.destroy({ where: { kleerkastId: dataToDelete.kleerkasten } });
//             await user.destroy({ where: { userId: dataToDelete.users } });
//         });
//         it('should return kleerkast with kleerkastId 2 and 201', async () => {
//             const response = await request.post(url).send({
//                 userId: 1,
//                 name: 'Kleerkast 2',
//                 location:'mcDonalds',
//             });
//             expect(response.status).toBe(201);
//             expect(response.body).toEqual({
//                 kleerkastId: 2,
//                 userId: 1,
//                 name: 'Kleerkast 2',
//                 location:'badkamer',
//             });
//         });
//         it('should return 400 when userId does not exist', async () => {
//             const response = await request.post(url).send({
//                 userId: 2,
//                 name: 'Kleerkast 2',
//                 location:'badkamer',
//             });
//             expect(response.status).toBe(400);
//         });
//     });
// });
