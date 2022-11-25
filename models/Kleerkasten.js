module.exports = (sequelize, DataTypes) => {
    const Kleerkast = sequelize.define('Kleerkasten', {
        kleerkastId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        
        freezeTableName: true,
    });

    return Kleerkast;
};