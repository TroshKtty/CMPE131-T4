// model for addresses of all users
const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const AddressItem = sequelize.define(
  "AddressItem",
  {
    address_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "address_items",
    timestamps: false,
  }
);

// AddressItem.sync({ alter: true });

module.exports = AddressItem;
