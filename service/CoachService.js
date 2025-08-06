const {coachRepository} = require('../repository/coachRepository');
const {ScoutRepository} = require("../repository/scoutRepository");

const createCoachProfile = async (coachData) => {
    try {
        const newCoach = await coachRepository.createCoach(coachData);
        return {
            status: 201,
            newCoach,
            data:{message:'Coach profile created successfully'
            }
        };
    } catch (error) {
        return {
            status: 500,data:{message:'Error creating coach profile:', error: error.message}
        };
    }
};

const updateCoachProfile = async (id,coachData) => {
    try {
        const coach = await coachRepository.findById(id);
        if (!coach) {
            return{status: 404,data:{message:'Coach not found'}
            }
        }
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
        return coach;
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};