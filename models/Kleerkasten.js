module.exports = (sequelize, DataTypes) => {
    const Kleerkast = sequelize.define('Kleerkasten', {
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
    }, {
        
        freezeTableName: true,
    });

    return Kleerkast;
};