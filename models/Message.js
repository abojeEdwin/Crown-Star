module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
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

    Message.associate = (models) => {
        Message.belongsTo(models.Chat, { foreignKey: 'chatId' });
        Message.belongsTo(models.User, { foreignKey: 'senderId' });
    };

    return Message;
};
