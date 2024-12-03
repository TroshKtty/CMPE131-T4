const Cart = require("./cart_model");
const CartItem = require("./cart_items_model");
const Product = require("./product");
const User = require("./auth_model");
/*const Order = require("./order");
const OrderItem = require("./order_items");*/

const setupAssociations = () => {
    // Cart and CartItem associations
    Cart.hasMany(CartItem, { foreignKey: "cart_id", sourceKey: "id" });
    CartItem.belongsTo(Cart, { foreignKey: "cart_id", targetKey: "id" });
  
    // CartItem and Product associations
    CartItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
    Product.hasMany(CartItem, { foreignKey: "product_id", sourceKey: "id" });
  
    // User and Cart association
    User.hasOne(Cart, { foreignKey: "customer_id", sourceKey: "user_id" });
    Cart.belongsTo(User, { foreignKey: "customer_id", targetKey: "user_id" });

};

/*Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });*/

module.exports = {setupAssociations};