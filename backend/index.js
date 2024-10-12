const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Import Sequelize and models from 'models/index.js'

const app = express();
app.use(bodyParser.json());

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the models and start the server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Unable to sync the database:', err);
});


