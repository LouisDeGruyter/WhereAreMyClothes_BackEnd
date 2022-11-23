const { sequelize,DataTypes } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Kledingstuk = sequelize.define('Kledingstuk', {
        
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },

 });
    return Kledingstuk;
};