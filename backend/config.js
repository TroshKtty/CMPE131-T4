const { Sequelize } = require('sequelize');
require('dotenv').config();

//connect to the database using sequelize orm

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_IP,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;  