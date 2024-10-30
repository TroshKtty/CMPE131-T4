// config.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_user, process.env.DB_password, {
    host: process.env.DB_IP,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;  // Export sequelize instance directly
