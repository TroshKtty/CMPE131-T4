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
          attributes: ["id", "category", "price", "weight", "images", "name", "quantity"], // Product attributes
        },
      },
    });

    // If cart doesn't exist, return an empty cart
    if (!cart) {
      return res.status(200).json({ cart: [], message: "Cart is empty" });
    }

    // Return cart items
    const cartItems = cart.CartItems.map((cartItem) => ({
        id: cartItem.Product.id,
        category: cartItem.Product.category,
        quantity: cartItem.Product.quantity,
        count: cartItem.quantity,
        images: cartItem.Product.images,
        name: cartItem.Product.name,
        price: cartItem.Product.price,
        weight: cartItem.Product.weight,
    }));

    res.status(200).json({ cart: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { itemId } = req.body;

    console.log(`${userId} is trying to add ${itemId} to their cart`);

    if (!itemId) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required." });
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
    try {
        const userId = req.user.user_id; //The User
        const { itemId } = req.body; // Product to be removed

        if (!itemId) {
          return res.status(400).json({ message: "Product ID is required." });
        }

        // The user's cart Id
        const userCart = await Cart.findOne({ where: { customer_id: userId } });

        if (!userCart) {
          return res.status(404).json({ message: "Cart not found for user." }); //User doesn't have a cart to remove items from
        }

        // Remove the specific product from the cart
        const deletedItem = await CartItem.destroy({
          where: {
            cart_id: userCart.id,
            product_id: itemId,
          },
        });

        if (deletedItem) {
          return res.status(200).json({ message: "Item removed from cart successfully." });
        } else {
          return res.status(404).json({ message: "Item not found in cart." });
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
}

const updateCount = async(req,res) => {
    try {
        const userId = req.user.user_id;
        const { itemId, itemCount } = req.body;


        if (!itemId || !itemCount || itemCount < 0) {
          return res.status(400).json({ message: "Invalid product ID or quantity." });
        }

        // Find the user's cart
        const userCart = await Cart.findOne({ where: { customer_id: userId } });

        if (!userCart) {
          return res.status(404).json({ message: "Cart not found for user." });
        }

        // Find the cart item to update
        const cartItem = await CartItem.findOne({
          where: {
            cart_id: userCart.id,
            product_id: itemId,
          },
        });

        if (!cartItem) {
          return res.status(404).json({ message: "Item not found in cart." });
        }

        //Make sure there is enough inventory to give to the user
        const product = await Product.findByPk(itemId);

        if (product.quantity < itemCount)
            return res.status(409).json({message: "Not enough items in inventory"});

        // Update the quantity
        cartItem.quantity = itemCount;
        await cartItem.save();

        return res.status(200).json({ message: "Cart updated successfully." });
      } catch (error) {
        console.error("Error updating cart:", error);
        return res.status(500).json({ message: "Internal server error." });
      }
}

module.exports = {getCart, addToCart, removeFromCart, updateCount};