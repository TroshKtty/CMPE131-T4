const Cart = require("./cart_model");
const CartItem = require("./cart_items_model");
const Product = require("./product");
const User = require("./auth_model");
const Order = require("./order_model");
const OrderItem = require("./order_items_model");

const setupAssociations = () => {
    // Cart and CartItem associations
    Cart.hasMany(CartItem, { foreignKey: "cart_id", sourceKey: "id"});
    CartItem.belongsTo(Cart, { foreignKey: "cart_id", targetKey: "id" });
  
    // CartItem and Product associations
    CartItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
    Product.hasMany(CartItem, { foreignKey: "product_id", sourceKey: "id"});

    Order.hasMany(OrderItem, { foreignKey: "order_id", sourceKey: "id"});
    OrderItem.belongsTo(Order, { foreignKey: "order_id", targetKey: "id" });

    OrderItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
    Product.hasMany(OrderItem, { foreignKey: "product_id", sourceKey: "id"});

};

(async () => {
    await Order.sync({ alter: true });
    await OrderItem.sync({ alter: true });
    await CartItem.sync({ alter: true });
    await Cart.sync({ alter: true });
    await Product.sync({alter: true});
  })();
  
module.exports = {setupAssociations};