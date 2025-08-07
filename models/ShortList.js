module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ShortList', {
        id: {
            type: DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
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
        timestamps: true,
    });

};
