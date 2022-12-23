'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Kledingstukken', [{
        brand: 'Nike',
        type: 'Schoenen',
        color: 'Blauw',
        size: 12,
        kleerkastId: 1,

      },
      {
        brand: 'Adidas',
        type: 'Broek',
        color: 'Rood',
        size: 50,
        kleerkastId: 1,

      },
      {
        brand: 'Tommy Hilfiger',
        type: 'Schoenen',
        color: 'Zwart',
        size: 30,
        kleerkastId: 1,

      },
      {
        brand: 'Nike',
        type: 'Broek',
        color: 'Blauw',
        size: 29,
        kleerkastId: 2,
      },
      {
        brand: 'Adidas',
        type: 'Broek',
        color: 'Rood',
        size: 14,
        kleerkastId: 2,
      },
      {
        brand: 'Puma',
        type: 'Schoenen',
        color: 'Zwart',
        size: 78,
        kleerkastId: 2,
      },
      {
        brand: 'Nike',
        type: 'Trui',
        color: 'Blauw',
        size: 56,
        kleerkastId: 3,
      },
      {
        brand: 'Adidas',
        type: 'Broek',
        color: 'Rood',
        size: 35,
        kleerkastId: 3,
      },
      {
        brand: 'Northface',
        type: 'Jas',
        color: 'Zwart',
        size: 45,
        kleerkastId: 3,
      },
      {
        brand: 'Levis',
        type: 'Broek',
        color: 'Blauw',
        size: 23,
        kleerkastId: 4,
      },
      {
        brand: 'zara',
        type: 'Broek',
        color: 'Rood',
        size: 12,
        kleerkastId: 4,
      },
      {
        brand: 'Puma',
        type: 'Schoenen',
        color: 'Zwart',
        size: 34,
        kleerkastId: 4,
      },
      {
        brand: 'Nike',
        type: 'Schoenen',
        color: 'Blauw',
        size: 12,
        kleerkastId: 5,
      },
      {
        brand: 'Reebok',
        type: 'Broek',
        color: 'Rood',
        size: 50,
        kleerkastId: 5,
      },
      {
        brand: 'Converse',
        type: 'Schoenen',
        color: 'Zwart',
        size: 30,
        kleerkastId: 5,
      },
      {
        brand: 'Fila',
        type: 'Broek',
        color: 'Blauw',
        size: 29,
        kleerkastId: 6,
      },
      {
        brand: 'Adidas',
        type: 'Broek',
        color: 'Rood',
        size: 14,
        kleerkastId: 6,
      },
      {
        brand: 'Puma',
        type: 'Schoenen',
        color: 'Zwart',
        size: 78,
        kleerkastId: 6,
      },
      {
        brand: 'Vans',
        type: 'Trui',
        color: 'Blauw',
        size: 56,
        kleerkastId: 7,
      },
      {
        brand: 'Kappa',
        type: 'T-shirt',
        color: 'Rood',
        size: 35,
        kleerkastId: 7,
      },
      {
        brand: 'Northface',
        type: 'Jas',
        color: 'Zwart',
        size: 45,
        kleerkastId: 7,
      },
      {
        brand: 'Levis',
        type: 'Trui',
        color: 'Blauw',
        size: 23,
        kleerkastId: 8,
      },
      {
        brand: 'zara',
        type: 'Rok',
        color: 'Rood',
        size: 12,
        kleerkastId: 8,
      },
      {
        brand: 'Puma',
        type: 'Schoenen',
        color: 'Zwart',
        size: 34,
        kleerkastId: 8,
      },
      {
        brand: 'Nike',
        type: 'Schoenen',
        color: 'Blauw',
        size: 12,
        kleerkastId: 9,
      },
      {
        brand: 'Adidas',
        type: 'Broek',
        color: 'Rood',
        size: 50,
        kleerkastId: 9,
      },
      {
        brand: 'Tommy Hilfiger',
        type: 'Schoenen',
        color: 'Zwart',
        size: 30,
        kleerkastId: 9,
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Kledingstukken', null, {});
  }
};