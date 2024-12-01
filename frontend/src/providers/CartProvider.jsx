import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // We only want to save the cart to localStorage after the initial load, not during it
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      try {
        const cartJson = JSON.parse(cartData);
        if (Array.isArray(cartJson)) {
          console.log("Restoring previous cart state");
          setCart(cartJson);
        } else {
          console.log("Cart was in a bad state, restoring");
          localStorage.setItem("cart", JSON.stringify([]));
        }
      } catch (error) {
        console.error(
          "An error occured while trying to restore cart state",
          error
        );
        localStorage.setItem("cart", JSON.stringify([]));
      }

      setIsInit(true);
    }
  }, []);

  useEffect(() => {
    if (!isInit) {
      return;
    }

    console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isInit]);

  // Add item to the cart
  const addToCart = (item) => {
    console.log("item to add", item);
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // console.log(`updated quantity of ${item.name}`);
        // Update quantity if the item already exists in the cart
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 } // Changed from item.quantity to 1
            : cartItem
        );
      } else {
        // console.log(`${item.name} was added to cart`);
        // Add new item to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative quantity
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
