const{verifyJwtToken} = '../utils/jwtTokenUtils'

export const authenticate = async (req, reply) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).json({message:"No token provided"});
    }
    const token = authHeader.split('Bearer ')[1];

    try {
        req.user = verifyJwtToken(token, process.env.JWT_SECRET);
    } catch (err) {
        return reply.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticate;