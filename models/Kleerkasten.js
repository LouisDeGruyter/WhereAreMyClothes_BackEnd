const { sequelize,DataTypes } = require(".");
module.exports = (sequelize, DataTypes) => {
    const Kleerkast = sequelize.define('Kleerkast', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        location: {
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
        }
    });
    return Kleerkast;
};