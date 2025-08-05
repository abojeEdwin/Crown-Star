
const {userRepository} = require('../repository/userRepository')
const {hashPassword,comparePassword} = require("../utils/passwordUtils");
const {isValidEmail} = require("../utils/emailUtils");
const {generateToken, verifyJwtToken} = require("../utils/jwtTokenUtils");

const registerUser = async (req,res) => {
    try{
        const existingUser = await userRepository.findByEmail(req.user.email);
        if(existingUser) {return res.status(400).json({message:'User already exists'});}
        req.user.password = await hashPassword(req.user.password);
        const createdUser = await userRepository.create(req.user);
        const token = generateToken(req.user.id);
        res.code(201).send({
            message: 'User registered successfully',
            success: true,
            token,
            user: {id: createdUser.id, role: createdUser.role, email: createdUser.email }
        });
    }catch(err){
        console.log('Error registering user', err);
        res.status(500).send({message:'Internal Server Error'});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!isValidEmail(email)) return res.code(400).send({message: 'Invalid email format'});
    try {
        const user = await userRepository.findOne({email});
        if (!req.user) res.code(404).send({message: 'User not found'});
        const isPasswordValid = await comparePassword(password);
        if (!isPasswordValid) return res.code(401).send({message: 'Invalid password'});
        const foundUser = await userRepository.findOne({email});
        if (!foundUser) res.code(401).send({message: 'Invalid email format'});
        const token = generateToken(req.user.id);
        res.code(201).send({
            message: 'Login successful',
            success: true,
            token,
            user: {userId: foundUser.id, role: foundUser.role, email: foundUser.email}
        })
    } catch (error) {
        console.error('Error during login:', error);
        res.code(500).send({message: 'Internal server error'});
    }
}

module.exports = {registerUser, loginUser};


