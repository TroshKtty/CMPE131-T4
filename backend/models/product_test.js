const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const ProductTest = sequelize.define('ProductTest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  item: {
    type: DataTypes.STRING(255),
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }, 
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'product_test',
});

module.exports = ProductTest;