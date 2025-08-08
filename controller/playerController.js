const playerService = require('../service/PlayerService');

const registerPlayer = async (req, res) => {
    try {
        const result = await playerService.registerPlayer({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return res.status(result.status).json(result.data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const result = await playerService.loginPlayer({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(result.status).json(result.data);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePlayer = async (req, res) => {
    try{
        const result = await playerService.updatePlayerProfile(req.params.id,{
                position: req.body.position,
                height: req.body.height,
                location: req.body.location,
                weight: req.body.weight,
                userName: req.body.userName,
                fullName: req.body.fullName,
                phone: req.body.phone,
                clubTeam: req.body.clubTeam,
                age: req.body.age,
                bio: req.body.bio,
                dob: req.body.dob,
        });
        return res.status(result.status).json(result.data);
    }catch(error){
        console.error('Update error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const viewPlayer = async (req, res) => {
    try{
        const result = await playerService.viewPlayerProfile(req.params.id);
        return res.status(result.status).json(result.data);
    }catch(error){
        console.error('View error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    registerPlayer,
    login,
    updatePlayer,
    viewPlayer,
}