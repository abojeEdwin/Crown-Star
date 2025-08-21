const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Scout = require('./Scout')(sequelize, DataTypes);
const Coach = require('./Coach')(sequelize, DataTypes);
const ShortList = require('./ShortList')(sequelize, DataTypes);
const Chat = require('./Chat')(sequelize, DataTypes);
const Player = require('./Player')(sequelize, DataTypes);
const Message = require('./Message')(sequelize, DataTypes);

module.exports = {
    sequelize,
    Scout,
    Coach,
    ShortList,
    Player,
    Chat,
    Message,
};