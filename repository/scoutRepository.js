const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Scout = require('../models/Scout')(sequelize, DataTypes);
const Player = require('../models/Player')(sequelize, DataTypes);

class ScoutRepository{
     async createScout(scoutData){
         return await Scout.create(scoutData);
     }
     async findByEmail(email){
         return await Scout.findOne({where: {email}});
     }
     async updateScout(id,scoutData){
         return await Scout.update(id,scoutData);
     }
     async findAllScout(){
         return await Scout.findAll();
     }
     async findScoutById(id){
         return await Scout.findById(id);
     }
     async findAllPlayers(){
         return await Player.findAll();
     }
}
module.exports = {
   scoutRepository : new ScoutRepository()
};