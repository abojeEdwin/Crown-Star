const {ScoutRepository} = require('../repository/scoutRepository');
const {playerRepository} = require("../repository/playerRepository");

const createScoutProfile = async (scoutData) => {
    try {
        const newScout = await ScoutRepository.createScout(scoutData);
        return {
            status: 201,
            newScout,
            data:{message:'Scout profile created successfully'
            }
        };
    } catch (error) {
        return {
            status: 500,data:{message:'Error creating scout profile:', error: error.message}
        };
    }
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