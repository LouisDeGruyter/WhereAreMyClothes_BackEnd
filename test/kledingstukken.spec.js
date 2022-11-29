const {tables} = require('../models');

const data= {
    kedingstukken: [
        {
            brand: 'Nike',
            color: 'zwart',
            type: 'schoenen',
            size: 42,
            kleerkastId: 1
        },
        {
            brand: 'Adidas',
            color: 'wit',
            type: 'schoenen',
            size: 43,
            kleerkastId: 1
        },
        {
            brand: 'Puma',
            color: 'rood',
            type: 'schoenen',
            size: 44,
            kleerkastId: 1
        },
    ],
    kleerkasten: [
        {
            userId: 1,
            naam: 'Kleerkast 1',
            location:'mcDonalds',
        },
    ],
    users: [
        {
            username: 'test',
            password: 'test',
            email: 'test@gmail.com',
        },
        {
            username: 'test2',
            password: 'test2',
            email: 'test2@gmail.com',
        },
        {
            username: 'test3',
            password: 'test3',
            email: 'test3@gmail.com',
        },
    ],
};

    const dataToDelete = {
        kledingstukken: [1,2,3,],
        kleerkasten: [1],
        users: [1],
    };
        
