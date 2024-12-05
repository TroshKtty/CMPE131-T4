// models/Address.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    tableName: 'address',
    timestamps: false,
  });

  // Address.sync({ alter: true });

module.exports = Address;
