const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


module.exports = (controller)=>{
    router.post('/register',controller.registerScout);
    router.post('/login',controller.loginScout);
    router.put('/updateScoutProfile',authenticate,controller.updateScoutProfile);
    router.post('/viewScoutProfile',authenticate,controller.viewScoutProfile);


    return router;
};