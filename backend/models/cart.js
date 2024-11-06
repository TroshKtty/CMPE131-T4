const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

// Define the Cart model (corresponds to the 'cart' table)
const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'cart',  // Maps to the 'cart' table in the database
});

module.exports = Cart;
