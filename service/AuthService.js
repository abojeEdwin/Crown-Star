const { userRepository } = require('../repository/userRepository');
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { isValidEmail } = require("../utils/emailUtils");
const { generateJwtToken } = require("../utils/jwtTokenUtils");
const {User} = require("../models/User")
const { COACH,PLAYER,SCOUT,Roles} = require("../models/Roles");



const registerUser = async (userData) => {
    try {
        if (!isValidEmail(userData.email)) {
            return { status: 400, data: { message: 'Invalid email format' } };
        }
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            return {
                status: 400,
                data: {message: 'User already exists'}};}

        const selectedRole = Object.values(Roles).includes(userData.role)
            ? userData.role
            : Roles.USER;

        const hashedPassword = await hashPassword(userData.password);

        const userToCreate = {email: userData.email, role: selectedRole, password: hashedPassword,};
        const createdUser = await userRepository.createUser(userToCreate);

        const token = generateJwtToken(createdUser.id);
        return {
            status: 201,
            data: {
                message: 'User registered successfully',
                success: true,
                token,
                user: {id: createdUser.id, role: createdUser.role, email: createdUser.email}}};

    } catch (err) {
        console.error('Registration error:', err);
        return {
            status: 500,
            data: {message: 'Internal server error', error: err.message}};}
};


const loginUser = async ({ email, password }) => {
    if (!isValidEmail(email)) {
        return { status: 400, data: { message: 'Invalid email format' } };
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
        return { status: 404, data: { message: 'User not found'}};}

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return { status: 401, data: {message: 'Invalid password'}};}

    const token = generateJwtToken(user.id);
    return {
        status: 200,
        data: {
            message: 'Login successful',
            success: true,
            token,
            user: {
                id: user.id,
                role: user.role,
                email: user.email
            }
        }
    };
};


module.exports = {registerUser, loginUser};


