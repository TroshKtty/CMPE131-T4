import { useCart } from "@/hooks/useCart";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (!Array.isArray(cart)) {
    return <p>There was an issue loading your cart. Please try again later.</p>;
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 200; // Example discount
  const estimatedTotal = subtotal - discount;

  return (
    <div className="checkout-page">
      <div className="cart-items">
        <h3>Shopping Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{item.name}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Discount</span>
          <span>-${discount}</span>
        </div>
        <div className="summary-item">
          <span>Estimated Total</span>
          <span>${estimatedTotal}</span>
        </div>
        <button className="continue-to-checkout">Continue to Checkout</button>
      </div>
    </div>
  );
};

// Reusable section component for delivery and payment information
const Section = ({ title, editLabel }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>Details go here...</p>
    <a href="#" className="edit-link">
      {editLabel}
    </a>
  </div>
);

export default CheckoutPage;
