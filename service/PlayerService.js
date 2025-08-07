const {playerRepository} = require("../repository/playerRepository")
const {userRepository} = require("../repository/userRepository")
const {isValidEmail} = require("../utils/emailUtils");
const {Roles} = require("../models/Roles");
const {hashPassword, comparePassword} = require("../utils/passwordUtils");
const {coachRepository} = require("../repository/coachRepository");
const {scoutRepository} = require("../repository/scoutRepository");
const {generateJwtToken} = require("../utils/jwtTokenUtils");

const registerPlayer = async (playerData) => {
    try {
        if (!isValidEmail(playerData.email)) {
            return { status: 400, data: { message: 'Invalid email format' } };
        }
        const existingPlayer = await playerRepository.findByEmail(playerData.email);
        if (existingPlayer) {
            return {
                status: 400,
                data: {message: 'Player already exists'}};}

        const registeredRole = Roles.PLAYER;

        const hashedPassword = await hashPassword(playerData.password);

        const playerToCreate = {email: playerData.email, role: registeredRole, password: hashedPassword};


        const createdPlayer = await playerRepository.create(playerToCreate);
        const token = generateJwtToken(createdPlayer.email);
        return {
            status: 201,
            data: {
                message: 'Player registered successfully',
                success: true,
                token,
                user: {role: createdPlayer.role, email: createdPlayer.email}
            }
        };

    } catch (err) {
        console.error('Registration error:', err);
        return {
            status: 500,
            data: {message: 'Internal server error', error: err.message}};}
};


const loginPlayer = async ({ email, password }) => {
    if (!isValidEmail(email)) {
        return { status: 400, data: { message: 'Invalid email format' } };
    }
    const player = await playerRepository.findByEmail(email);
    if (!player) {
        return { status: 404, data: { message: 'Player not found'}};}

    const isPasswordValid = await comparePassword(password, player.password);
    if (!isPasswordValid) {
        return { status: 401, data: {message: 'Invalid password'}};}

    const token = generateJwtToken(email);
    return {
        status: 200,
        data: {
            message: 'Login successful',
            success: true,
            token,
            user: {
                role: player.role,
                email: player.email
            }
        }
    };
};

const updatePlayerProfile = async (playerId,playerData) => {
        try {
            const player = await playerRepository.findById(playerId);
            if (!player) {
                return{status: 404,data:{message:'Player not found'}
                }
            }
            Object.assign(player, playerData);
            const updatedPlayer = await playerRepository.save(player);
            return {status: 204, updatedPlayer, data:{message:'Player profile updated successfully'}};
        } catch (error) {
            return {status: 500,data:{message:'Error updating player:',error: error.message}}
        }
};

const viewPlayerProfile = async (playerId) => {
    try{
        const player = await playerRepository.findById(playerId);
        if (!player) {
            return {status: 404,data:{message:'Player not found'}
            }
        }
        if(player.role !== Roles.PLAYER)
            return {status: 403,data:{message:'Unauthorized access'}};
        return player;
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};

module.exports = {
    registerPlayer,
    loginPlayer,
    updatePlayerProfile,
    viewPlayerProfile,
}

