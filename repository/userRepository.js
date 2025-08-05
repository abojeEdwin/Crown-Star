const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('../models/User')(sequelize, DataTypes);

class UserRepository {
    async createUser(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findByUsername(username) {
        return await User.findOne({ where: { username } });
    }

    async findById(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] },
        });
    }
}

module.exports = {
    userRepository: new UserRepository()
};
