const Users = require("../models/auth_model");
const Cart = require("../models/cart_model");
const CartItem = require("../models/cart_items_model");
const Product = require("../models/product");

const getCart = async (req, res) => {
    try {
      const userId = req.user.user_id; // Assuming `req.user` is populated by middleware after verifying JWT or session
  
      // Fetch the user's cart
      const cart = await Cart.findOne({
        where: { customer_id: userId },
        include: {
          model: CartItem,
          include: {
            model: Product,
            attributes: ['id', 'category', 'price', 'weight', 'images', 'name'], // Product attributes
          },
        },
      });

  
      // If cart doesn't exist, return an empty cart
      if (!cart) {
        return res.status(200).json({ cart: [], message: 'Cart is empty' });
      }
  
      // Return cart items
      const cartItems = cart.CartItems.map((cartItem) => ({
        id: cartItem.id,
        count: cartItem.quantity,
        category: cartItem.Product.category,
        images: cartItem.Product.images,
        name: cartItem.Product.name,
        price:cartItem.Product.price,
        weight: cartItem.Product.weight
      }));
  
      res.status(200).json({ cart: cartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  };

  const addToCart = async (req, res) => {
    try {
      const userId = req.user.user_id;
      const { itemId } = req.body;
  
      if (!itemId ) {
        return res.status(400).json({ message: "Product ID and quantity are required." });
      }
  
      // Check if the cart exists for the user
      let cart = await Cart.findOne({ where: { customer_id: userId } });
      if (!cart) {
        cart = await Cart.create({ customer_id: userId });
      }
  
      // Check if the item already exists in the cart
      const existingItem = await CartItem.findOne({
        where: { cart_id: cart.id, product_id: itemId },
      });
  
      if (existingItem) {
        // Update quantity if the item exists
        existingItem.quantity += 1;
        await existingItem.save();
      } else {
        // Add new item to the cart
        await CartItem.create({
          cart_id: cart.id,
          product_id: itemId,
          quantity: 1,
        });
      }
  
      res.status(200).json({ message: "Item added to cart successfully." });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

const removeFromCart = async(req,res) => {

}

const updateQuantity = async(req,res) => {

}

module.exports = {getCart, addToCart};