const Sequelize = require('sequelize');
const fs = require('fs');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/config.js')[env];
const config2= require('config');
const {
  getLogger
} = require('../../core/logging');
const force= config2.get('initialezeDatabaseParameters.force');
const alter= config2.get('initialezeDatabaseParameters.alter');
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = {};
db.sequelize = sequelize;
db.models = {};
db.models.user = require('./users')(sequelize, Sequelize.DataTypes);
db.models.kledingstuk = require('./kledingstukken')(sequelize, Sequelize.DataTypes);
db.models.kleerkast = require('./kleerkasten')(sequelize, Sequelize.DataTypes);
db.functions={};


const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};
const initializeData = async () => {
  await db.sequelize.sync({
    force: force,
    alter: alter
  }).then((require) => {
    debugLog('Database initialized');
  }).catch((error) => {
    debugLog(error);
  });
}

const user = db.models.user;
const kledingstuk = db.models.kledingstuk;
const kleerkast = db.models.kleerkast;

kleerkast.hasMany(kledingstuk, { foreignKey: 'kleerkastId' , as:"kledingstukken", onDelete: 'cascade'});

user.hasMany(kleerkast, { foreignKey: 'userId' ,as:"kleerkasten", onDelete: 'CASCADE'});
kleerkast.belongsTo(user, { foreignKey: 'userId' ,as:"user"});
kledingstuk.belongsTo(kleerkast, { foreignKey: 'kleerkastId' ,as:"kleerkast"});


async function shutdownData(){
  await sequelize.close();
  debugLog('database connection closed');
}
db.functions.initializeData=initializeData;
db.functions.shutdownData=shutdownData;



module.exports = db;