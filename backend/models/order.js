const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Order = sequelize.define('Order', {
  customerId: DataTypes.INTEGER,
  totalWeight: DataTypes.FLOAT,
  totalPrice: DataTypes.FLOAT,
  deliveryCharge: DataTypes.FLOAT,
  deliveryAddress: DataTypes.STRING
});

module.exports = Order;
