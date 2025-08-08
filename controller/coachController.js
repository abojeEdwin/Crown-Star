const coachService = require('../service/CoachService');

const register = async (req, res) => {
    try{
        const result = await coachService.registerCoach({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        return res.status(result.status).json(result.data);
    }catch(err){
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try{
        const result = await coachService.loginCoach({
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(result.status).json(result.data);
    }catch(err){
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCoach = async (req, res) => {
    try{
        const result = await coachService.updateCoachProfile(req.params.id,{
            userName: req.body.userName,
            fullName: req.body.fullName,
            teamName: req.body.teamName,
            experienceYears: req.body.experienceYears,
            phone: req.body.phone,
            age: req.body.age,
            bio: req.body.bio,
            dob: req.body.dob,
        })
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const viewCoach = async (req, res) => {
    try{
        const result = await coachService.viewCoachProfile(req.params.id)
        return res.status(result.status).json(result.data);
    }catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {register,login,updateCoach,viewCoach};