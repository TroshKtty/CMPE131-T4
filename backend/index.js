const sequelize = require('./config');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const token = require('./middleware/auth');
const auth_route = require('./routes/auth_routes');
const pending_route = require('./routes/pending_routes');


const app = express();
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials to be included
}));

app.use('/auth', auth_route);
app.use('/users', pending_route);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
})



