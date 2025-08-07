const {coachRepository} = require('../repository/coachRepository');
const {isValidEmail} = require("../utils/emailUtils");
const {Roles} = require("../models/Roles");
const {hashPassword, comparePassword} = require("../utils/passwordUtils");
const {generateJwtToken} = require("../utils/jwtTokenUtils");

const registerCoach = async (coachData) => {
    try {
        if (!isValidEmail(coachData.email)) {
            return { status: 400, data: { message: 'Invalid email format' } };
        }
        const existingCoach = await coachRepository.findByEmail(coachData.email);
        if (existingCoach) {
            return {
                status: 400,
                data: {message: 'Coach already exists'}};}

        const registeredRole = Roles.COACH;
        const hashedPassword = await hashPassword(coachData.password);
        const coachToCreate = {email: coachData.email, role: registeredRole, password: hashedPassword};

        const createdCoach = await coachRepository.createCoach(coachToCreate);
        const token = generateJwtToken(createdCoach.email);
        return {
            status: 201,
            data: {
                message: 'Coach registered successfully',
                success: true,
                token,
                user: {role: createdCoach.role, email: createdCoach.email}
            }
        };
    } catch (err) {
        console.error('Registration error:', err);
        return {
            status: 500,
            data: {message: 'Internal server error', error: err.message}};}
};

const loginCoach = async ({ email, password }) => {
    if (!isValidEmail(email)) {
        return { status: 400, data: { message: 'Invalid email format' } };
    }
    const coach = await coachRepository.findByEmail(email);
    if (!coach) {
        return { status: 404, data: { message: 'Coach not found'}};}

    const isPasswordValid = await comparePassword(password, coach.password);
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
                role: coach.role,
                email: coach.email
            }
        }
    };
};

const updateCoachProfile = async (coachData) => {
    try {
        const coach = await coachRepository.findById(coachData.id);
        if (!coach) {
            return{status: 404,data:{message:'Coach not found'}
            }
        }
        if(coach.role !== Roles.COACH)
            return {status: 403,data:{message:'Unauthorized access'}};
        Object.assign(coach, coachData);
        const updatedCoach = await coachRepository.save(coachData);
        return {status: 204, updatedCoach, data:{message:'Coach profile updated successfully'}};
    } catch (error) {
        return {status: 500,data:{message:'Error updating coach:',error: error.message}
        };
    }
};

const viewCoachProfile = async (id) => {
    try{
        const coach = await coachRepository.findById(id);
        if (!coach) {
            return {status: 404,data:{message:'Coach not found'}
            }
        }
        if(coach.role !== Roles.COACH)
            return {status: 403,data:{message:'Unauthorized access'}};
        return coach;
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};



module.exports = {registerCoach, loginCoach, updateCoachProfile, viewCoachProfile};