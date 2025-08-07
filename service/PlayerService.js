const {playerRepository} = require("../repository/playerRepository")
const {userRepository} = require("../repository/userRepository")


const createPlayerProfile = async (playerData) => {

        try {
            const newPlayer = await playerRepository.create(playerData);
            return {
                status: 201,
                newPlayer,
                data:{message:'Player profile created successfully'
                }
            };
        } catch (error) {
            return {
                status: 500,data:{message:'Error creating player profile:', error: error.message}
            }
        }
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
        return player;
    }catch(error){
        return {
            status: 500,
            data:{message:'Internal server error:',error: error.message}
        };
    }
};

module.exports = {
    createPlayerProfile,
    updatePlayerProfile,
    viewPlayerProfile,
}

