const express = require('express');
const sequelize = require('./config'); // Import sequelize instance
const cors = require('cors');
require('dotenv').config();
const token = require('./middleware/auth');
const auth_route = require('./routes/auth_routes');


const app = express();
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials to be included
}));

app.use('/auth', auth_route);

const PORT = 3000;

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
});

app.get('/api/product_test', async (req, res) => {
  try {
    const products = await Product.findAll(); // Retrieves all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});