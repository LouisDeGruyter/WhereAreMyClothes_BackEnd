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
        kleerkastId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
    },
        {
            freezeTableName: true,
        });
        
    return Kledingstuk;
};