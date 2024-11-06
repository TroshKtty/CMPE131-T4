const bcrypt = require('bcrypt');
const user = require('../models/login_model');

function compare(a, b) {
  if (a == b) {
    return 1;
  }else {
    return 0;
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password' });
  }

  try {
    const foundUser = await new Promise((resolve, reject) => {
      user.find_by_email(email, (error, user) => {
        if (error) return reject(error);
        resolve(user);
      });
    });

    if (!foundUser) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    const validPassword = await compare(password, foundUser.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    if (foundUser.role === 'admin') {
      return res.json({ message: 'Login successful', redirectTo: '/admin_dashboard' });
    } else if (foundUser.role === 'employee') {
      return res.json({ message: 'Login successful', redirectTo: '/employee_dashboard' });
    } else if (foundUser.role === 'customer') {
      return res.json({ message: 'Login successful', redirectTo: '/' });
    } else {
      return res.status(400).json({ error: 'Invalid user role.' });
    }
  } catch (error) {
    res.json({ error: 'Database error or internal server error.' });
  }
};

module.exports = {
  login
};
