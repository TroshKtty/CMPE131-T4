const express = require('express');
<<<<<<< Updated upstream
const bodyParser = require('body-parser');
const connection = require('./config');
//const bcrypt = require('bcryptjs');
const loginRoute = require('./routes/login_route');
=======
const sequelize = require('./config'); // Import sequelize instance
const cors = require('cors');
require('dotenv').config();
const token = require('./middleware/auth');
const auth_route = require('./routes/auth_routes');
const pending_route = require('./routes/pending_routes');

>>>>>>> Stashed changes

const app = express();
app.use(express.json());

<<<<<<< Updated upstream
// Use the login route under the '/api' path
app.use('/api/login', loginRoute);
=======

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials to be included
}));

app.use('/auth', auth_route);
app.use('/users', pending_route);
>>>>>>> Stashed changes

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})



