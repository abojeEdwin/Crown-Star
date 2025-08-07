module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Chat', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        }
    });


};
