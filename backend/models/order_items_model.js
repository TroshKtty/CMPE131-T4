const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
    timestamps: false,
  tableName: 'order_items',
});

// OrderItem.sync({ alter: true });
module.exports = OrderItem;
