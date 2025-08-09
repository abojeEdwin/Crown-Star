const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');

module.exports = (controller) => {
    router.post('/login', controller.login);
    router.post('/register', controller.registerPlayer)
    router.put('/updatePlayer/:id',authenticate,controller.updatePlayer)
    router.get('/viewPlayerProfile/:playerId', authenticate,controller.viewPlayer)
    router.post('/players/:id/profile-picture',authenticate,
        upload.single('profilePicture'), controller.uploadProfilePicture);

    return router;
};

