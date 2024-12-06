//maps a user to a cart and then that cart will have itmes in it.
const { DataTypes } = require("sequelize");
const sequelize = require("../config.js");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "cart",
  }
);

// Cart.sync({ alter: true });

module.exports = Cart;
