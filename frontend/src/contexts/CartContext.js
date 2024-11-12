// src/contexts/CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create a Context for the Cart
const CartContext = createContext();

// Custom hook to use the Cart Context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap around the parts of the app that need access to the cart
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fetch initial cart data from the backend when the component mounts
    useEffect(() => {
        axios.get('/api/cart') // Adjust this URL based on your backend setup
            .then(response => setCart(response.data))
            .catch(error => console.error("Error fetching cart data:", error));
    }, []);

    // Function to add an item to the cart
    const addToCart = (item) => {
        axios.post('/api/cart', item)
            .then(response => setCart(response.data))
            .catch(error => console.error("Error adding to cart:", error));
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        axios.delete(`/api/cart/${id}`)
            .then(response => setCart(response.data))
            .catch(error => console.error("Error removing from cart:", error));
    };

    // Function to update the quantity of an item in the cart
    const updateQuantity = (id, quantity) => {
        axios.put(`/api/cart/${id}`, { quantity })
            .then(response => setCart(response.data))
            .catch(error => console.error("Error updating quantity:", error));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

