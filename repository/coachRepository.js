const sequelize = require("../config/database");
const { DataTypes } = require('sequelize');
const {Scout} = require("../models/Scout")(sequelize, DataTypes);
const {Coach} = require('../models/Coach')(sequelize, DataTypes);
const {Player} = require('../models/Player')(sequelize, DataTypes);


class CoachRepository{

    async createCoach(coachData){
        return await Coach.create(coachData);
    }
    async updateCoach(coachData){
        return await Coach.update(coachData);
    }
    async findCoachById(id){
        return await Coach.findById(id);
    }
    async findAllCoach(){
        return await Coach.findAll();
    }
    async findPlayerById(playerId){
        return await Player.findById(playerId);
    }
    async findAllScout(){
        return await Scout.findAll();
    }
    async findAllPlayerById(id){
        return await Player.findById(id);
    }
    async findScoutById(id){
        return await Scout.findById(id);
    }
    async findAllPlayers(){
        return await Player.findAll();
    }
    async findById(id){
        return await Coach.findById(id);
    }
    async save(coachData){
        return await Coach.save(coachData);
    }
}

module.exports = {
   coachRepository: new CoachRepository()
};
