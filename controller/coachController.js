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

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const coachId = req.params.id;
        const filePath = req.file.path;
        const result = await coachService.uploadProfilePicture(coachId, filePath);
        if (result.status >= 400) {
            return res.status(result.status).json(result.data);
        }
        return res.status(200).json({
            message: 'Profile picture uploaded successfully',
            imageUrl: result.data,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};

module.exports = {register,login,updateCoach,viewCoach,uploadProfilePicture};