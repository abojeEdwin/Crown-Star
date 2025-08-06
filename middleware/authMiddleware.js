const { verifyJwtToken } = require('../utils/jwtTokenUtils');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split('Bearer ')[1];
    try {
        const decoded = verifyJwtToken(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('JWT verification error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });}
};
module.exports = authenticate;
