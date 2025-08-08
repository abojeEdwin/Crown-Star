
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true
});

const models = require('../models');

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('Models synchronized successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;