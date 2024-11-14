import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("/api/cart") // Adjust this URL based on your backend setup
  //       .then((response) => setCart(response.data))
  //       .catch((error) => console.error("Error fetching cart data:", error));
  //   }, []);

  //   const addToCart = (item) => {
  //     axios
  //       .post("/api/cart", item)
  //       .then((response) => setCart(response.data))
  //       .catch((error) => console.error("Error adding to cart:", error));
  //   };

  //   const removeFromCart = (id) => {
  //     axios
  //       .delete(`/api/cart/${id}`)
  //       .then((response) => setCart(response.data))
  //       .catch((error) => console.error("Error removing from cart:", error));
  //   };

  //   const updateQuantity = (id, quantity) => {
  //     axios
  //       .put(`/api/cart/${id}`, { quantity })
  //       .then((response) => setCart(response.data))
  //       .catch((error) => console.error("Error updating quantity:", error));
  //   };

  return (
    <CartContext.Provider
      //   value={{ cart, addToCart, removeFromCart, updateQuantity }}
      value={{ cart, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
