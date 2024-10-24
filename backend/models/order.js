const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const Order = sequelize.define('Order', {
  customerId: DataTypes.INTEGER,
  totalWeight: DataTypes.FLOAT,
  totalPrice: DataTypes.FLOAT,
  deliveryCharge: DataTypes.FLOAT,
  deliveryAddress: DataTypes.STRING
});

module.exports = Order;
