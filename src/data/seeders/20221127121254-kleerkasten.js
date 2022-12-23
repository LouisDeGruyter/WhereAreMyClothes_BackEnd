'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Kleerkasten', [{
        name: 'Kleerkast 1',
        location: 'Kamer 1',
        userId: 1,
      },
      {
        name: 'Kleerkast 2',
        location: 'Appartement',
        userId: 1,
      },
      {
        name: 'Kleerkast 3',
        location: 'Zolder',
        userId: 1,
      },
      {
        name: 'Kleerkast 4',
        location: 'Kamer 4',
        userId: 1,
      },
      {
        name: 'Kleerkast 5',
        location: 'Kamer 5',
        userId: 2,
      },
      {
        name: 'Kleerkast 6',
        location: 'Keuken 6',
        userId: 2,
      },
      {
        name: 'Kleerkast 7',
        location: 'Kamer 7',
        userId: 2,
      },
      {
        name: 'Kleerkast 8',
        location: 'Gang',
        userId: 2,
      },
      {
        name: 'Kleerkast 9',
        location: 'Kamer 9',
        userId: 3,
      },
      {
        name: 'Kleerkast 10',
        location: 'Badkamer',
        userId: 3,
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Kleerkasten', null, {});
  }
};