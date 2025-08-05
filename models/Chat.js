module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        }
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.User, { as: 'user1', foreignKey: 'user1Id' });
        Chat.belongsTo(models.User, { as: 'user2', foreignKey: 'user2Id' });

        Chat.hasMany(models.Message, { foreignKey: 'chatId' });
    };

    return Chat;
};
