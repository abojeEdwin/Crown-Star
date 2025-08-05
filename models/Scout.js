module.exports = (sequelize, DataTypes) => {

    const Scout = sequelize.define('Scout', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        fullName :{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },

        organisation : {
            type: DataTypes.STRING,
            allowNull: true,
        },

        location : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt : {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
        {
            tableName: 'scout',
            timestamps: true,
            updatedAt: 'updatedAt',
            createdAt: 'createdAt',
        });

    Scout.associate = (models) => {
        Scout.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

        Scout.hasMany(models.ShortList, {
            foreignKey: 'scoutId',
            as: 'shortlistedPlayers'
        });
    };
    return Scout;

}