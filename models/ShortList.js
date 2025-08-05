module.exports = (sequelize, DataTypes) => {
    const ShortList = sequelize.define('ShortList', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        scoutId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'shortlists',
        timestamps: false,
    });

    ShortList.associate = (models) => {
        ShortList.belongsTo(models.Scout, {
            foreignKey: 'scoutId',
            as: 'scout',
            onDelete: 'CASCADE',
        });

        ShortList.belongsTo(models.Player, {
            foreignKey: 'playerId',
            as: 'player',
            onDelete: 'CASCADE',
        });
    };

    return ShortList;
};
