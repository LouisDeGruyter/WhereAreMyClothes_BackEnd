module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.createTable('Kleerkasten', {
          kleerkastId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          location: {
              type: Sequelize.STRING,
              allowNull: false,
          },
      }, {

          freezeTableName: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Kleerkasten');
  }
}