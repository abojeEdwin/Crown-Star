const {Player} = require('../models/Player');
const {scoutRepository} = require('./scoutRepository');
const {coachRepository} = require('./coachRepository');
const {Scout} = require("../models/Scout");

const createPlayer = async (player) => {
    return Player.create(player)
}
const getPlayer = async (id) => {
    return Player.findById(id)
}
const updatePlayer = async (id, player) => {
    return Player.update(id, player)
}
const findAllPlayers = async () => {
    return Player.findAll()
}
const viewScouts = async () => {
 return scoutRepository.findAll()
}
const viewScoutById = async (id) => {
    return Scout.findById(id)
}
const viewAllCoaches = async () => {
    return coachRepository.findAll()
}
const viewCoachById = async (id) => {
    return coachRepository.findById(id)
}

module.exports = {
    createPlayer,
    getPlayer,
    updatePlayer,
    findAllPlayers,
    viewScouts,
    viewScoutById,
    viewAllCoaches,
    viewCoachById,
}

