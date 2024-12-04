const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'card',  
  timestamps: false,
});

Card.sync({ alter: true });

module.exports = Card;