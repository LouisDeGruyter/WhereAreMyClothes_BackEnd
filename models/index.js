const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const {getLogger} = require('../src/core/logging');
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const debugLog= (message,meta = {})=> {
  if(!this.logger) this.logger = getLogger();
  this.logger.debug(message,meta);
};
const initializeDatabase = async () => {
  await db.sequelize.sync({alter: true}).then((require) => {
    debugLog('Database initialized');
}).catch((error) => {
  debugLog(error);
});
}

const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.user= require('./users')(sequelize,Sequelize.DataTypes);
db.models.kledingstuk= require('./kledingstukken')(sequelize,Sequelize.DataTypes);
db.models.kleerkast= require('./kleerkasten')(sequelize,Sequelize.DataTypes);

const user = db.models.user;
const kledingstuk = db.models.kledingstuk;
const kleerkast = db.models.kleerkast;



initializeDatabase();



module.exports = db;
