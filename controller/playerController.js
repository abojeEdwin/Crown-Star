const playerService = require('../service/PlayerService');


const createPlayerProfile = async (req, res) => {

    try{
        // const userId = req.user.id;
        const result = await playerService.createPlayerProfile({
            userId: req.playerId,
            fullName: req.body.fullName,
            username: req.body.username,
            position: req.body.position,
            height: req.body.height,
            weight: req.body.weight,
            location: req.body.location,
            clubTeam: req.body.clubTeam,
            phone: req.body.phone,
            age: req.body.age,
            bio: req.body.bio,
            dob: req.body.dob,
        });
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    createPlayerProfile
}