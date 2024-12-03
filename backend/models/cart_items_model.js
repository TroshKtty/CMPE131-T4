const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

// Define the Cart model (corresponds to the 'cart' table)
const CartItem = sequelize.define('CartItem', {
    cart_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
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
      defaultValue: 1,
    },
 }, {
  tableName: 'cart_items', 
});

CartItem.sync({ alter: true });

module.exports = CartItem;