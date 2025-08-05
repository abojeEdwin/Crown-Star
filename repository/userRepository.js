const {User} = require('../models/User');

const createUser = async (user) => {
    return User.create(user)
}
const findByEmail = async (email) => {
    return User.findOne({where: {email} });
}
const findByUsername = async (username) => {
    return User.findOne({where: {username}});
}
const findById = async (id) => {
    return User.findByPk(id,{
        attributes: {exclude: ['password']},
    });
};

module.exports = {
    createUser,
    findByEmail,
    findById,
    findByUsername
};