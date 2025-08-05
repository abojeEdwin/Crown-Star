const {Scout} = require('../models/Scout');
const {playerRepository} = require('../repository/playerRepository');
const {scout} = require('../repository/scoutRepository');
const scoutRepository = require("./coachRepository");

const createScout = async (Scout) => {
    return Scout.create(Scout)
}
const updateScout = async (ScoutId, Scout) => {
    return Scout.update(ScoutId, Scout)
}
const findScoutById = async (id) => {
    return findScoutById(id)
}
const findAllScout = async () => {
    return Scout.findAll()
}
const findAllPlayer = async () => {
    return playerRepository.findAll()
}
const findAll = async () => {
    return scoutRepository.findAll()
}

module.exports = {
    findAllPlayer,
    createScout,
    updateScout,
    findScoutById,
    findAllScout,
}