module.exports = (sequelize, DataTypes) => {
    const Kleerkast = sequelize.define('Kleerkasten', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        
        freezeTableName: true,
    });

    return Kleerkast;
};