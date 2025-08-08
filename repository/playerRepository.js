const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Scout = require("../models/Scout")(sequelize, DataTypes);
const Player = require('../models/Player')(sequelize, DataTypes);
const Coach = require('../models/Coach')(sequelize, DataTypes);

class PlayerRepository{
    async findByUsername(username) {
        return await Player.findOne({ where: { username } });
    }
    async create(playerData) {
        return await Player.create(playerData);
    }
    async findByEmail(email) {
        return await Player.findOne({where:{email}})
    }
    async findAllPlayer(){
        return await Player.findAll();
    }
    async viewScouts(){
        return await Scout.findAll();
    }
    async viewScoutById(id){
        return await Scout.findById(id);
    }
    async viewAllCoaches(){
        return await Coach.findAll();
    }
    async viewCoachById(id){
        return await Coach.findById(id);
    }
    async findById(id){
        return await Player.findByPk(id);
    }
    async findPlayerById(id){
        return await Player.findByPk(id);
    }
    async savePlayer(id, playerData){
        await Player.update(playerData, { where: { id } });
        return await Player.findByPk(id);
    }
}


module.exports = {
   playerRepository: new PlayerRepository()
};

