'use strict';
const faker=require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let kleerkasten=[];
    for (let i = 0; i < 40; i++) {
      kleerkasten.push({
        name: faker.name.firstName(),
        location: faker.address.city(),
        userId: i%2,
      });
    }
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Kleerkasten', null, {});
  }
};
