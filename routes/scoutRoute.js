const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


module.exports = (controller)=>{
    router.post('/register',controller.registerScout);
    router.post('/login',controller.loginScout);
    router.put('/updateScout/:id',authenticate,controller.updateScoutProfile);
    router.get('/viewScoutProfile/:id',authenticate,controller.viewScoutProfile);


    return router;
};