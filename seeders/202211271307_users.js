'use strict';
const {faker} = require('@faker-js/faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = [];
        for (let i = 0; i < 3; i++) {
            users.push({
                username: faker.name.firstName(),
                password: faker.internet.password(),
                email: faker.internet.email(),
            });
        }
        return queryInterface.bulkInsert('Users', users);
    }
    ,
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};

    