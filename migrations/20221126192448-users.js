
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.createTable('Users', {
          userId: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          username: {
              type: Sequelize.STRING,
              allowNull: false,

          },
      },
      {
          freezeTableName: true,
          timestamps: false,
          });
  },
  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Users');
  }
};