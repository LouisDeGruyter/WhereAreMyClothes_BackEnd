module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.createTable('Kledingstukken', {
          kledingstukId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,

          },
          kleur: {
              type: Sequelize.STRING,
              allowNull: false,

          },
          maat: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          kleerkastId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                  model: 'Kleerkasten',
                  key: 'kleerkastId'
              }
          },
          userId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                  model: 'Users',
                  key: 'userId'
              }
          },
      });
  },
  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Kledingstukken');
  }
};