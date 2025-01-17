const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized. Token missing." });
    }

    const token = authHeader.split(" ")[1];
    //console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }

};


//to verify if the user has permission to access the particular endpoint
const verifyPermission = (role) => async (req, res, next) => {
    const userRole = req.user.role;
    if (role != userRole) {
        return res.status(403).json({ message: 'Access Denied' });
    }
    next();
};


module.exports = {auth,verifyPermission};
