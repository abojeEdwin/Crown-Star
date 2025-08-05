const userService = require('../service/AuthService');
const {loginUser} = require("../service/AuthService");

const register = async (req, res) => {
    try {
        const result = await userService.registerUser({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return res.status(result.status).json(result.data);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { register, login};