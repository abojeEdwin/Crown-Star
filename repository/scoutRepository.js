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
         return await Scout.findOne(id);
     }
     async findAllPlayers(){
         return await Player.findAll();
     }
     async findById(id){
         return await Scout.findByPk(id);
     }
     async findPlayerById(id){
         return await Player.findByPk(id);
     }
    saveScout = async (id, scoutData) => {
        await Scout.update(scoutData, { where: { id } });
        return await Scout.findOne({ where: { id } });
    };

}
module.exports = {
   scoutRepository : new ScoutRepository()
};