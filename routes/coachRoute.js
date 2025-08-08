const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


module.exports = (controller)=>{
    router.post('/register',controller.register);
    router.post('/login',controller.login);
    router.put('/updateCoach/:id', authenticate, controller.updateCoach);
    router.get('/viewCoachProfile/:id', authenticate,controller.viewCoach);

    return router;
};