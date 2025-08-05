const userService = require('../service/AuthService');

const register = async (req, res) => {
    try {
        const { user, token } = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered', user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await userService.loginUser(req.body);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

module.exports = { register, login};