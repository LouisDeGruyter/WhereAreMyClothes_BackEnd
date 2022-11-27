'use strict';
const faker=require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let kledingstukken = [];
    for (let i = 0; i < 40; i++) {
      kledingstukken.push({
        name: faker.name.firstName(),
        kleur: faker.internet.color(),
        userId: i%2,
      });
    }
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
