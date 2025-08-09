const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");


module.exports = (controller)=>{
    router.post('/register',controller.registerScout);
    router.post('/login',controller.loginScout);
    router.put('/updateScout/:id',authenticate,controller.updateScoutProfile);
    router.get('/viewScoutProfile/:id',authenticate,controller.viewScoutProfile);
    router.post('/:id/profile-picture',authenticate,
        upload.single('profilePicture'), controller.uploadProfilePicture);


    return router;
};