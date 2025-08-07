const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

module.exports = (controller) => {
    router.post('/login', controller.login);
    router.post('/register', controller.registerPlayer)
    router.put('/updatePlayer/', controller.updatePlayerProfile)
    router.get('/view/:playerId', controller.viewPlayerProfile)

    return router;
};

