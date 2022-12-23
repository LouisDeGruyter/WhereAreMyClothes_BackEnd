module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        auth0id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
    return User;
}