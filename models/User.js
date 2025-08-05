const {Roles} = require("./Roles");
module.exports = (sequelize, DataTypes) => {
    const Coach = require('./../models/Coach');

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                password: true
            }
        },
        role: {
            type: Roles.USER,
            allowNull: false,
            defaultValue: 'user',
        },

    }, {
        tableName: 'users',
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    });



    User.associate = (models) => {

        User.hasOne(models.Coach, { foreignKey: 'userId', as: 'coach', onDelete: 'CASCADE' });
        User.hasOne(models.Player, { foreignKey: 'userId', as: 'player', onDelete: 'CASCADE' });
        User.hasOne(models.Scout, { foreignKey: 'userId', as: 'scout',onDelete: 'CASCADE' });
    };

    return User;
};
