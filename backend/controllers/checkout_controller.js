const Users = require("../models/auth_model");
const Cart = require("../models/cart_model");
const CartItem = require("../models/cart_items_model");
const Product = require("../models/product");
const Order = require("../models/order_model");
const OrderItems = require("../models/order_items_model");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.user_id; // Assume JWT middleware sets req.user
    const { addressId, cardId } = req.body;

    // Validate required fields
    if (!addressId || !cardId) {
      return res.status(400).json({ error: "Shipping address and payment method are required." });
    }

    // Fetch cart items for the user
    const cart = await Cart.findOne({
      where: { customer_id: userId },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["id", "price", "weight", "quantity"], // Product attributes
        },
      },
    });

    // Check if cart exists
    if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
      return res.status(400).json({ error: "Your cart is empty." });
    }

    // Validate product availability and update quantities
    let subtotal = 0;
    let totalWeight = 0;
    for (const item of cart.CartItems) { // Accessing CartItems here
      if (item.Product.quantity < item.quantity) {
        return res.status(400).json({ message: "Some items are out of stock" });
      } else {
        item.Product.quantity -= item.quantity;
        await item.Product.save(); // Update product quantity
      }

      subtotal += item.quantity * item.Product.price;
      totalWeight += item.quantity * item.Product.weight;
    }

    const tax = subtotal * 0.08;
    const shippingFee = totalWeight >= 20 ? 5 : 0;
    const total = subtotal + tax + shippingFee;

    // Create the order
    const newOrder = await Order.create({
      customer_id: userId,
      totalWeight: totalWeight,
      totalPrice: total,
      deliveryCharge: shippingFee,
      deliveryAddressId: addressId, // Use addressId from request body
      createdAt: new Date(), // Set current timestamp
      status: "Placed", // Initial status
      cardId, // Save the selected card's ID
    });

    // Create order items
    const orderItems = cart.CartItems.map((item) => ({
      order_id: newOrder.id,
      product_id: item.Product.id, // Access product's id here
      quantity: item.quantity,
      price: item.Product.price,
      weight: item.Product.weight,
    }));

    // Save order items
    await OrderItems.bulkCreate(orderItems);

    // Clear the cart after placing the order
    await Cart.destroy({ where: { customer_id: userId } });

    // Return success response
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
    res.status(500).json({ error: "An error occurred while creating the order." });
  }
};

module.exports = { createOrder };
