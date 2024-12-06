const Users = require("../models/auth_model");
const Cart = require("../models/cart_model");
const CartItem = require("../models/cart_items_model");
const Product = require("../models/product");
const Order = require("../models/order_model");
const OrderItems = require("../models/order_items_model");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { addressId, cardId } = req.body;

    if (!addressId || !cardId) {
      return res
        .status(400)
        .json({ error: "Shipping address and payment method are required." });
    }

    // get the items in the cart
    const cart = await Cart.findOne({
      where: { customer_id: userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["id", "price", "weight", "quantity"],
        },
      },
    });

    //mak e sure that the cart exists for that user and there are itmes in that cart
    if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
      return res.status(400).json({ error: "Your cart is empty." });
    }

    // check availability and update stock info
    let subtotal = 0;
    let totalWeight = 0;
    for (const item of cart.CartItems) {
      if (item.Product.quantity < item.quantity) {
        return res.status(400).json({ message: "Some items are out of stock" });
      } else {
        item.Product.quantity -= item.quantity;
        await item.Product.save();
      }

      subtotal += item.quantity * item.Product.price;
      totalWeight += item.quantity * item.Product.weight;
    }

    const tax = subtotal * 0.08;
    const shippingFee = totalWeight >= 20 ? 5 : 0;
    const total = subtotal + tax + shippingFee;

    // create the order entry
    const newOrder = await Order.create({
      customer_id: userId,
      totalWeight: totalWeight,
      totalPrice: total,
      deliveryCharge: shippingFee,
      deliveryAddressId: addressId,
      createdAt: new Date(),
      status: "Placed", // order placed but not completed
      cardId,
    });

    // items in that order
    const orderItems = cart.CartItems.map((item) => ({
      order_id: newOrder.id,
      product_id: item.Product.id,
      quantity: item.quantity,
      price: item.Product.price,
      weight: item.Product.weight,
    }));

    await OrderItems.bulkCreate(orderItems);

    // clear the items in the cart
    await Cart.destroy({ where: { customer_id: userId } });

    res.status(201).json({
      message: "Order created successfully.",
      order: {
        id: newOrder.id,
        total,
        status: newOrder.status,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
};

module.exports = { createOrder };
