module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        chatId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true
    });

};
