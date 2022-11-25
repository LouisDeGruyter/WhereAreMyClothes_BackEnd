module.exports = (sequelize, DataTypes) => {

    const Kledingstuk = sequelize.define('Kledingstukken', {

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