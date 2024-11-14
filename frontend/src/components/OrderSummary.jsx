// src/components/OrderSummary.js
import React from 'react';
import './OrderSummary.css';

const OrderSummary = () => {
    // Example static values; you may replace them with calculated values from context or props
    const subtotal = 100.0; // Placeholder value for subtotal
    const weight = 5.0;     // Placeholder value for weight in lbs
    const deliveryFee = 10.0; // Placeholder value for delivery fee
    const estimatedTax = 8.5; // Placeholder value for estimated tax
    const total = subtotal + deliveryFee + estimatedTax; // Calculate total

    return (
        <div className="order-summary">
            <button className="place-order">Place Order</button>
            <div className="summary">
                <div className="summary-item">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span>Weight:</span>
                    <span>{weight} lbs</span>
                </div>
                <div className="summary-item">
                    <span>Delivery fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <span>Estimated Tax:</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                </div>
            </div>
            <div className="promo">
                <input type="text" placeholder="Promocode" />
            </div>
            <div className="total">
                <h3>Total:</h3>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderSummary;
