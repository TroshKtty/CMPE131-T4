const sequelize = require('../config');

// Import all models
const Customer = require('./customer');
const Product = require('./product');
const ProductTest = require('./product_test');
const Order = require('./order');
const OrderItem = require('./order_items');  // Ensure this is correct
const Cart = require('./cart');

// // Define model relationships (associations)
// Customer.hasMany(Order, { foreignKey: 'customer_id' });
// Order.belongsTo(Customer, { foreignKey: 'customer_id' });

// Order.hasMany(OrderItem, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
// OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Customer.hasMany(Cart, { foreignKey: 'customer_id' });
// Cart.belongsTo(Customer, { foreignKey: 'customer_id' });
// Cart.belongsTo(Product, { foreignKey: 'product_id' });

// Export all models
module.exports = {
  ProductTest,
  sequelize
};
