const {ScoutRepository, scoutRepository} = require('../repository/scoutRepository');
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

        const registeredRole = Roles.SCOUT;
        const hashedPassword = await hashPassword(scoutData.password);
        const scoutToCreate = {email: scoutData.email, role: registeredRole, password: hashedPassword};


        const createdScout = await scoutRepository.createScout(scoutToCreate);
        const token = generateJwtToken(createdScout.email);
        return {
            status: 201,
            data: {
                message: 'Scout registered successfully',
                success: true,
                token,
                user: {role: createdScout.role, email: createdScout.email}
            }
        };

    } catch (err) {
        console.error('Registration error:', err);
        return {
            status: 500,
            data: {message: 'Internal server error', error: err.message}};}
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
        const scout = await ScoutRepository.findById(id);
        if (!scout) {
            return{status: 404,data:{message:'Scout not found'}
            }
        }
        Object.assign(scout, scoutData);
        const updatedScout = await ScoutRepository.save(scoutData);
        return {status: 204, updatedScout, data:{message:'Scout profile updated successfully'}};
    } catch (error) {
        return {status: 500,data:{message:'Error updating scout:',error: error.message}
        };
    }
};

const viewScoutProfile = async (id) => {
    try{
        const scout = await ScoutRepository.findById(id);
        if (!scout) {
            return {status: 404,data:{message:'Scout not found'}
            }
        }
        return scout;
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};


module.exports = {registerScout, loginScout, updateScoutProfile, viewScoutProfile};