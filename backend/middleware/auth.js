const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(403).send('Access denied. No token provided');
  
  try {
    const decoded = jwt.verify(token, 'ayoXB51iOnhddwL83jxFY97MTAyZsoD8');
    req.customer = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
