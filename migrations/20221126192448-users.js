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
          password: {
              type: Sequelize.STRING,
              allowNull: false,

          },
          email: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true,
          }
      });
  },
  down: async (queryInterface, Sequelize) => {
      return await queryInterface.dropTable('Users');
  }
};