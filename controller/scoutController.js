const scoutService =  require('../service/ScoutService');

const registerScout = async (req, res) => {
    try{
        const result = await scoutService.registerScout({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({error:'Internal server error'});
    }
};

const loginScout = async (req, res) => {
    try{
        const result = await scoutService.loginScout({
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

const updateScoutProfile = async (req, res) => {
    try{
        const result = await scoutService.updateScoutProfile(req.params.id,{
            fullName: req.body.fullName,
            userName: req.body.userName,
            organisation: req.body.organisation,
            bio: req.body.bio,
            location: req.body.location,

        });
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

const viewScoutProfile = async (req, res) => {
    try{
        const result = await scoutService.viewScoutProfile({
            id: req.params.id,
        });
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

module.exports ={registerScout, loginScout, updateScoutProfile, viewScoutProfile};