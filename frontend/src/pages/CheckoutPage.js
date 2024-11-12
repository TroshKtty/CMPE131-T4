// src/pages/CheckoutPage.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import OrderSummary from '../components/OrderSummary';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    return (
        <div className="checkout-page">
            <div className="main-content">
                <Section title="Delivery Information" editLabel="Edit Address Preset" />
                <Section title="Payment Method" editLabel="Edit Payment Preset" />
                
                <div className="card">
                    <h3>Shopping Cart Details</h3>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <p>{item.name}</p>
                                <p>Price: ${item.price}</p>
                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <OrderSummary />
        </div>
    );
};

// Reusable section component for delivery and payment information
const Section = ({ title, editLabel }) => (
    <div className="card">
        <h3>{title}</h3>
        <p>Details go here...</p>
        <a href="#" className="edit-link">{editLabel}</a>
    </div>
);

export default CheckoutPage;
