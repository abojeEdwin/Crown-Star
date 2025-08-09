const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");


module.exports = (controller)=>{
    router.post('/register',controller.register);
    router.post('/login',controller.login);
    router.put('/updateCoach/:id', authenticate, controller.updateCoach);
    router.get('/viewCoachProfile/:id', authenticate,controller.viewCoach);
    router.post('/:id/profile-picture',authenticate,
        upload.single('profilePicture'), controller.uploadProfilePicture);

    return router;
};