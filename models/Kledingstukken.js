module.exports = (sequelize, DataTypes) => {

    const Kledingstuk = sequelize.define('Kledingstukken', {

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
        kleerkastId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
    },
        {
            freezeTableName: true,
        });
        
    return Kledingstuk;
};