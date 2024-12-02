import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  // We only want to save the cart to localStorage after the initial load, not during it
  const [hasCartInit, setHasCartInit] = useState(false);

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
    }

    setHasCartInit(true);
  }, []);

  useEffect(() => {
    if (!hasCartInit) {
      return;
    }

    console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hasCartInit]);

  // Add item to the cart
  const addToCart = (item) => {
    console.log("Item to add", item);

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        console.log(
          `Updating count of ${existingItem.name} from ${
            existingItem.count
          } to ${existingItem.count + 1}`
        );

        // Update count if the item already exists in the cart
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      } else {
        // Add new item to the cart
        const newItem = {
          ...item,
        };
        newItem.count ??= 1;

        console.log("Adding to cart:", newItem);

        return [...prevCart, newItem];
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Updates the count of an item in the cart
  const updateCount = (id, count) => {
    if (count < 1) {
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: count } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCount,
        hasCartInit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
