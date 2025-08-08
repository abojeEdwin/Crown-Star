const {scoutRepository} = require('../repository/scoutRepository');
const {isValidEmail} = require("../utils/emailUtils");
const {Roles} = require("../models/Roles");
const {hashPassword, comparePassword} = require("../utils/passwordUtils");
const {generateJwtToken} = require("../utils/jwtTokenUtils");

const registerScout = async (scoutData) => {
    try {
        if (!isValidEmail(scoutData.email)) {
            return { status: 400, data: { message: 'Invalid email format' } };
        }
        const existingScout = await scoutRepository.findByEmail(scoutData.email);
        if (existingScout) {
            return {
                status: 400,
                data: {message: 'Scout already exists'}};
        }

        const hashedPassword = await hashPassword(scoutData.password);
        const scoutToCreate = {email: scoutData.email, role: Roles.SCOUT, password: hashedPassword};


        const createdScout = await scoutRepository.createScout(scoutToCreate);
        const token = generateJwtToken(createdScout.email);
        return {
            status: 201,
            data: {
                message: 'Scout registered successfully',
                success: true,
                token,
                user: {role: Roles.SCOUT, email: createdScout.email, id: createdScout.id}
            }
        };

    } catch (error) {
        console.error('Registration error:', error);
        return {
            status: 500,
            data: {message: 'Internal server error', error: error.message}};}
};


const loginScout = async ({ email, password }) => {
    if (!isValidEmail(email)) {
        return { status: 400, data: { message: 'Invalid email format' } };
    }
    const scout = await scoutRepository.findByEmail(email);
    if (!scout) {
        return { status: 404, data: { message: 'Scout not found'}};
    }
    const isPasswordValid = await comparePassword(password, scout.password);
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
                role: scout.role,
                email: scout.email
            }
        }
    };
};

const updateScoutProfile = async (id,scoutData) => {
    try {
        const scout = await scoutRepository.findById(id);
        if (!scout) {
            return{status: 404,data:{message:'Scout not found'}
            }
        }
        const updatedScout = await scoutRepository.saveScout(id,scoutData);
        return {status: 204, updatedScout, data:{message:'Scout profile updated successfully'}};
    } catch (error) {
        return {status: 500,data:{message:'Error updating scout:',error: error.message}
        };
    }
};

const viewScoutProfile = async (scoutId) => {
    try{
        const scout = await scoutRepository.findScoutById(scoutId);
        if (!scout) {
            return {status: 404,data:{message:'Scout not found'}
            }
        }
        if(scout.role !== Roles.SCOUT)
            return {status: 403,data:{message:'Unauthorized access'}}
        return {
            status: 200,
            data: scout};
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};


module.exports = {registerScout, loginScout, updateScoutProfile, viewScoutProfile};