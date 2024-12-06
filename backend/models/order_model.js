//model to store order info, total price,weight, delviery, add., card used to make payment, customer, status, and date of order
const { DataTypes } = require("sequelize");
const sequelize = require('../config.js');


  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryCharge: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryAddressId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    tableName: "orders",
    timestamps: false,
  });

  // Order.sync({ alter: true });

module.exports = Order;

