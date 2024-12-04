import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isAddressOpen, setAddressOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // Success state
  const [savedCards, setSavedCards] = useState([]); // Cards state
  const [savedAddresses, setSavedAddresses] = useState([]); // Addresses state

  const location = useLocation();
  const { subtotal, shipping } = location.state || { subtotal: 0, shipping: 0 };
  const tax = subtotal * 0.08;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigateTo  = useNavigate();
  useEffect(() => {
    // Fetch saved cards and addresses from the backend
    if(subtotal == 0)
        navigateTo("/cart");
    const fetchSavedCardsAndAddresses = async () => {
      try {
        const cardsResponse = await axios.get("/userInfo/cards", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const addressesResponse = await axios.get("/userInfo/addresses");

        const cardsData = await cardsResponse.data.cards;
        const addressesData = await addressesResponse.data.addresses;

        setSavedCards(cardsData);
        setSavedAddresses(addressesData);
      } catch (error) {
        console.error("Error fetching cards and addresses:", error);
      }
    };

    fetchSavedCardsAndAddresses();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handlePlaceOrder = async () => {
    if (selectedCard === "") {
      alert("Please select a payment method.");
      return;
    }
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/checkout/createOrder",
        { cardId: selectedCard.id, addressId: selectedAddress.id},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
    setOrderPlaced(true); // Show success message
  };

  return (
    <div className={styles.checkoutPageContainer}>
      {/* Left Section - Payment and Address Details */}
      <div className={styles.leftSection}>
        <h1>Checkout</h1>

        {/* Payment Section */}
        <div className={styles.collapsibleSection}>
          <div
            className={styles.collapsibleHeader}
            onClick={() => setPaymentOpen(!isPaymentOpen)}
          >
            <h2>Select Payment Method</h2>
            <span>{isPaymentOpen ? "-" : "+"}</span>
          </div>
          {isPaymentOpen && (
            <div className={styles.collapsibleContent}>
              <select
                required
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
              >
                {savedCards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.label}
                  </option>
                ))}
              </select>
              {!selectedCard && (
                <div>
                  <br />
                  <Link to={"/account"} style={{ textDecoration: "none" }}>
                    <button className={styles.redirectButton}>
                      Different Card?
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Address Section */}
        <div className={styles.collapsibleSection}>
          <div
            className={styles.collapsibleHeader}
            onClick={() => setAddressOpen(!isAddressOpen)}
          >
            <h2>Select Delivery Address</h2>
            <span>{isAddressOpen ? "-" : "+"}</span>
          </div>
          {isAddressOpen && (
            <div className={styles.collapsibleContent}>
              <select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {savedAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.label}
                  </option>
                ))}
              </select>
              {!selectedAddress && (
                <div>
                  <br />
                  <Link to={"/account"} style={{ textDecoration: "none" }}>
                    <button className={styles.redirectButton}>
                      Different Address?
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className={styles.rightSection}>
        <h2>Order Summary</h2>
        <div className={styles.summaryDetails}>
          <div className={styles.summaryItem}>
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Tax:</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Delivery Fee:</span>
            <span>{shipping.toFixed(2)}</span>
          </div>

          {/* Line before Total */}
          <div className={styles.separator}></div>

          <div className={styles.summaryItemTotal}>
            <strong>Total:</strong>
            <strong>{(subtotal + tax + shipping).toFixed(2)}</strong>
          </div>
        </div>
        <button
          className={styles.primaryButton}
          onClick={handlePlaceOrder}
          disabled={!selectedCard || !selectedAddress}
        >
          Place Order
        </button>
        {orderPlaced && (
          <div className={styles.successMessage}>
            <p>Your order has been placed successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}
