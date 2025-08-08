const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


module.exports = (controller)=>{
    router.post('/register',controller.register);
    router.post('/login',controller.login);
    router.put('/updateCoachProfile', authenticate, controller.updateCoach);
    router.get('/viewCoachProfile', authenticate,controller.viewCoach);

    return router;
};