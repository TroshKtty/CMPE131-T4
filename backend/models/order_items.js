const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

// Define the OrderItem model (corresponds to the 'order_items' table)
const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
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
},
   {
  tableName: 'order_items',  // Maps to the 'order_items' table in the database
});

await OrderItem.sync();
module.exports = OrderItem;
