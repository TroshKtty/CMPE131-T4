//Assocaiation File for making sure all foreign keys and references work

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
  // Cart has Cartitems in it
  Cart.hasMany(CartItem, { foreignKey: "cart_id", sourceKey: "id" });
  CartItem.belongsTo(Cart, { foreignKey: "cart_id", targetKey: "id" });

  // A product can be in many carts
  Product.hasMany(CartItem, { foreignKey: "product_id", sourceKey: "id" });
  CartItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });

  // an Order has many Orderitems in it
  Order.hasMany(OrderItem, { foreignKey: "order_id", sourceKey: "id" });
  OrderItem.belongsTo(Order, { foreignKey: "order_id", targetKey: "id" });

  // a produt can be in many orders
  OrderItem.belongsTo(Product, { foreignKey: "product_id", targetKey: "id" });
  Product.hasMany(OrderItem, { foreignKey: "product_id", sourceKey: "id" });

  // one card/wallet id can have many cards associated with it
  Card.hasMany(CardItem, { foreignKey: "card_id", sourceKey: "id" });
  CardItem.belongsTo(Card, { foreignKey: "card_id", targetKey: "id" });

  // one address id can have many addresses in it - multiple delviery addresses
  Address.hasMany(AddressItem, { foreignKey: "address_id", sourceKey: "id" });
  AddressItem.belongsTo(Address, { foreignKey: "address_id", targetKey: "id" });

  // same address can have multiple orders delivered to it
  AddressItem.hasMany(Order, { foreignKey: "deliveryAddressId", sourceKey: "address_item_id" });
  Order.belongsTo(AddressItem, { foreignKey: "deliveryAddressId", targetKey: "address_item_id" });

  // same card can be used for many orders
  CardItem.hasMany(Order, { foreignKey: "cardId", sourceKey: "card_item_id" });
  Order.belongsTo(CardItem, { foreignKey: "cardId", targetKey: "card_item_id" });

  // a user can have many orders
  User.hasMany(Order, { foreignKey: "customer_id", sourceKey: "user_id" });
  Order.belongsTo(User, { foreignKey: "customer_id", targetKey: "user_id" });

};

//sync the models with the database
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
