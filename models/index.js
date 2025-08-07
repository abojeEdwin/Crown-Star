const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust path as needed

// Import model definitions
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
    Scout,
    Coach,
    ShortList,
    Player,
    Chat,
};