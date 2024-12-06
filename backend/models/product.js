//model to store all the products

const { DataTypes } = require("sequelize");
const sequelize = require("../config.js");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING, // delimited strings
      allowNull: false,
      defaultValue: "",
    },
    descriptions: {
      type: DataTypes.TEXT("long"), // delimited strings
      allowNull: false,
    },
    nutritionInfo: {
      type: DataTypes.TEXT("long"), // delimited strings
      allowNull: false,
    },
    specifications: {
      type: DataTypes.TEXT("long"), // delimited strings
      allowNull: false,
    },
  },
  {
    tableName: "product",
  }
);

module.exports = Product;
