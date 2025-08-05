const {coachRepository} = require('../repository/coachRepository')
const {playerRepository} = require('../repository/playerRepository')
const {scoutRepository} = require('../repository/scoutRepository')
const {Coach} = require('../models/Coach')


const createCoach = async (coach) => {
    return Coach.create(coach)
}
const updateCoach = async (coach) => {
    return Coach.update(coach)
}
const findCoachById = async (id) => {
    return Coach.findById(id)
}
const findAll = async () => {
    return Coach.findAll()
}
const findPlayerById = async (playerId) => {
    return playerRepository.findById(playerId)
}
const findScoutById = async (id) => {
    return scoutRepository.findById(id)
}
const findAllScout = async () =>{
    return scoutRepository.findAll()
}
const findAllPlayer = async () =>{
    return playerRepository.findAll()
}

module.exports = {
    createCoach,
    updateCoach,
    findCoachById,
    findAll,
    findPlayerById,
    findScoutById,
    findAllScout,
    findAllPlayer,
}
