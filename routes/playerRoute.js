const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

module.exports = (controller) => {
    router.post('/createPlayerProfile',authenticate, controller.createPlayerProfile);

    return router;
};

