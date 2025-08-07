const {registerCoach, loginCoach, updateCoachProfile} =  require('../service/CoachService');


const register = async (req, res) => {
    try{
        const result = await registerCoach({
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
        const result = await loginCoach({
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
        const result = await updateCoachProfile({

        })
    }
}



module.exports = {register,login};