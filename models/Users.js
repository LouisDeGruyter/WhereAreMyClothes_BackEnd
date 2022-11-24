module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                NotEmpty: true
            }
        }
    },
    {
        freezeTableName: true,
    });
    return User;
}