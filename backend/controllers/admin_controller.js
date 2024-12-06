const jwt = require('jsonwebtoken');
require('dotenv').config();

admin_dash = (req, res) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({message: "No Token Provided"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      // Logic to fetch data or handle requests specific to the admin dashboard
      
      if (req.user.role !== 'admin'){
        return res.status(403).json({message: 'Access Denied'});
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };