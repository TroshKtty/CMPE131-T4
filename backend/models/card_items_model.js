const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const CardItem = sequelize.define('CardItem', {
    card_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    card_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      cvv: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      expiry: {
        type: DataTypes.STRING(5), // "MM/YY"
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      }
 }, {
  tableName: 'card_items',
  timestamps: false, 
});

CardItem.sync({ alter: true });

module.exports = CardItem;