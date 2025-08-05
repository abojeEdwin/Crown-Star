const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwtToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || '1d',
    });
};

const verifyJwtToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateJwtToken,
    verifyJwtToken,
}