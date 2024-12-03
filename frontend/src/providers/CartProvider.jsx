import axios from "axios";
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

    //console.log("cart", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hasCartInit]);

  // Add item to the cart
  const addToCart = async (item, token) => {
    console.log("item to add", item);
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

    try {
      await axios.post(
        "http://localhost:3000/cart/addToCart", 
        {itemId: item.id},
        {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        }
    );
    } catch (err) {
      console.log(err.response.data.message + "Failed to add item to cart");
    }
  };

  // Remove item from the cart
  const removeFromCart = async (id, token) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    try {
      await axios.post("http://localhost:3000/cart/removeFromCart", {
        itemId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    }
    );
    } catch (err) {
      console.log(err + "Failed to remove item from cart");
    }
  };

  // Updates the count of an item in the cart
  const updateCount = async (id, count) => {
    if (count < 1) {
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: count } : item
      )
    );

    try {
      await axios.post("http://localhost:3000/cart/updateCount", {
        itemId: id,
        itemCount: count,
      });
    } catch (err) {
      console.log(err + "Failed to update quantity");
    }
  };

  const syncCart = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/cart",
        {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        }
      );
      if (response.status === 200 && Array.isArray(response.data.cart)) {
        setCart(response.data.cart);
        localStorage.setItem("cart", JSON.stringify(response.data.cart)); // Sync with localStorage
        console.log("Cart updated from backend");
      } else {
        console.error("Failed to fetch cart");
        setCart([]); // Empty Cart in case any kinds of error
        localStorage.setItem("cart", JSON.stringify([])); // Clear localStorage
      }
    } catch (error) {
      console.error("Some shit went wrong", error);
      setCart([]); // Reset cart in case of error
      localStorage.setItem("cart", JSON.stringify([])); // Clear localStorage
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCount,
        hasCartInit,
        syncCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
