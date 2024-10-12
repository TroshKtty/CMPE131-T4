const { Sequelize } = require('sequelize');

// Connecting to MySQL in XAMPP with the default 'root' user (no password)
const sequelize = new Sequelize('ofsdb', 'root', '', {  // '' for no password
  host: 'localhost',
  dialect: 'mysql',
  port: 3306 // Default MySQL port for XAMPP
});

module.exports = sequelize;
