const {playerRepository} = require("../repository/playerRepository")
const {isValidEmail} = require("../utils/emailUtils");
const {Roles} = require("../models/Roles");
const {hashPassword, comparePassword} = require("../utils/passwordUtils");
const {generateJwtToken} = require("../utils/jwtTokenUtils");
const cloudinary = require("../config/cloudinary");
const Player = require("../models/Player");

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

        const hashedPassword = await hashPassword(playerData.password);

        const playerToCreate = {email: playerData.email, role: Roles.PLAYER, password: hashedPassword};


        const createdPlayer = await playerRepository.create(playerToCreate);
        const token = generateJwtToken(createdPlayer.email);
        return {
            status: 201,
            data: {
                message: 'Player registered successfully',
                success: true,
                token,
                user: {role: Roles.PLAYER, email: createdPlayer.email, id: createdPlayer.id}
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

const updatePlayerProfile = async (id,playerData) => {
        try {
            const player = await playerRepository.findById(id);
            if (!player) {
                return{status: 404,data:{message:'Player not found'}
                }
            }
            const updatedPlayer = await playerRepository.savePlayer(id,playerData);
            return {status: 204, updatedPlayer, data:{message:'Player profile updated successfully'}};
        } catch (error) {
            return {status: 500,data:{message:'Error updating player:',error: error.message}}
        }
};

const viewPlayerProfile = async (playerId) => {
    try{
        const player = await playerRepository.findPlayerById(playerId);
        if (!player) {
            return {status: 404,data:{message:'Player not found'}
            }
        }
        if(player.role !== Roles.PLAYER)
            return {status: 403,data:{message:'Unauthorized access'}};
        return {
            status: 200,
            data: player
        };
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};

async function uploadProfilePicture(playerId, filePath){
    try{
        const result = await cloudinary.uploader.upload(filePath,{
            folder: 'player_profiles',
            resource_type:'image',
        });
        await playerRepository.savePlayer(
             playerId,
            { 'profilePicture': result.secure_url }
        );
        return{status : 200 ,data:result.secure_url};
    }catch(error){
        return {
            status: 500,
            data:{message:'Error uploading image:',error: error.message}
        }
    }
}

module.exports = {
    registerPlayer,
    loginPlayer,
    updatePlayerProfile,
    viewPlayerProfile,
    uploadProfilePicture,
}

