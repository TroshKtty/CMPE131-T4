const sequelize = require('./config');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const token = require('./middleware/auth');
const auth_route = require('./routes/auth_routes');
const pending_route = require('./routes/pending_routes');


const app = express();
app.use(express.json());

const db = require('./models');


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

/*
// API endpoint to fetch products  DOESNT WORK
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
*/

const PORT = 3000;

// Start server
db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
  });
});
