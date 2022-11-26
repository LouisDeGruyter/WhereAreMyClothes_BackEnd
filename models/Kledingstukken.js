module.exports = (sequelize, DataTypes) => {

    const Kledingstuk = sequelize.define('Kledingstukken', {
        kledingstukId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
      
        },
    },
        {
            freezeTableName: true,
            timestamps: false,
        });
        
    return Kledingstuk;
};