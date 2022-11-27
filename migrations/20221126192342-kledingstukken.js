module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.createTable('Kledingstukken', {
          kledingstukId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          brand: {
              type: Sequelize.STRING,
              allowNull: false,

          },
          type: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          color: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          size: {
              type: Sequelize.INTEGER,
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
      },
      {
      freezeTableName: true,
      timestamps: false,
          });
  },
  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Kledingstukken');
  }
};