const Card = require("./card_model");
const CardItem = require("./card_items_model");
const Cart = require("./cart_model");
const CartItem = require("./cart_items_model");
const Product = require("./product");
const User = require("./auth_model");
const Order = require("./order_model");
const OrderItem = require("./order_items_model");
const Address = require("./address_model");
const AddressItem = require("./address_items_model");

const setupAssociations = () => {
  // Cart and CartItem associations
  Cart.hasMany(CartItem, { foreignKey: "cart_id", sourceKey: "id" });
  CartItem.belongsTo(Cart, { foreignKey: "cart_id", targetKey: "id" });

  // CartItem and Product associations
  CartItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
  Product.hasMany(CartItem, { foreignKey: "product_id", sourceKey: "id" });

  // Order and OrderItem associations
  Order.hasMany(OrderItem, { foreignKey: "order_id", sourceKey: "id" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", targetKey: "id" });

  // OrderItem and Product associations
  OrderItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
  Product.hasMany(OrderItem, { foreignKey: "product_id", sourceKey: "id" });

  // Card and CardItem associations
  Card.hasMany(CardItem, { foreignKey: "card_id", sourceKey: "id" });
  CardItem.belongsTo(Card, { foreignKey: "card_id", targetKey: "id" });

  // Add. and Add.Item associations
  Address.hasMany(AddressItem, { foreignKey: "address_id", sourceKey: "id" });
  AddressItem.belongsTo(Address, { foreignKey: "address_id", targetKey: "id" });

  Order.belongsTo(AddressItem, { foreignKey: "deliveryAddressId", targetKey: "address_item_id" });
  AddressItem.hasMany(Order, { foreignKey: "deliveryAddressId", sourceKey: "address_item_id" });

  Order.belongsTo(CardItem, { foreignKey: "cardId", targetKey: "card_item_id" });
  CardItem.hasMany(Order, { foreignKey: "cardId", sourceKey: "card_item_id" });

  Address.belongsTo(User, {
    foreignKey: "customer_id",
    targetKey: "user_id",
    as: "customer",
  });
};

(async () => {
  await Order.sync({ alter: true });
  await OrderItem.sync({ alter: true });
  await CartItem.sync({ alter: true });
  await Cart.sync({ alter: true });
  await Product.sync({ alter: true });
  await Card.sync({ alter: true });
  await CardItem.sync({ alter: true });
  await Address.sync({ alter: true });
  await AddressItem.sync({ alter: true });
})();
module.exports = { setupAssociations };
