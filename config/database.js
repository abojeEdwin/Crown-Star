// db.js
const { Sequelize } = require("sequelize");
const fs = require("fs");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        dialectOptions: {
            // ssl: {
            //     ca: fs.readFileSync(__dirname + "/certs/ca.pem"),
            // },
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    }
);

module.exports = sequelize;


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