const jwt = require('jsonwebtoken');

const secret_key = process.env.JWT_secret;

const auth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
