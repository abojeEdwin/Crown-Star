const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path as needed

// Import model definitions
const User = require('./User')(sequelize, DataTypes);
const Scout = require('./Scout')(sequelize, DataTypes);
const Coach = require('./Coach')(sequelize, DataTypes);
const ShortList = require('./ShortList')(sequelize, DataTypes);
const Chat = require('./Chat')(sequelize, DataTypes);
const Player = require('./Player')(sequelize, DataTypes);

// Define associations here if needed
// Example:
// User.hasOne(Scout);
// Scout.belongsTo(User);

// Export models
module.exports = {
    sequelize,
    User,
    Scout,
    Coach,
    ShortList,
    Player,
    Chat,
};