import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isAddressOpen, setAddressOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [savedCards, setSavedCards] = useState([]); // Cards state (initialized as an empty array)
  const [savedAddresses, setSavedAddresses] = useState([]); // Addresses state also empty

  //get cost info from cart page redirect if data not present or no order added to cart
  const location = useLocation();
  const { subtotal, shipping } = location.state || { subtotal: 0, shipping: 0 };
  const tax = subtotal * 0.08;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log("selectedCard=", selectedCard);
    console.log("selectedAddress=", selectedAddress);
  }, [selectedCard, selectedAddress]);

  useEffect(() => {
    // fetch saved cards and addresses from the backend
    if (subtotal === 0) navigateTo("/cart");

    const fetchSavedCardsAndAddresses = async () => {
      try {
        const cardsResponse = await axios.get(
          "http://localhost:3000/userInfo/cardInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const addressesResponse = await axios.get(
          "http://localhost:3000/userInfo/addressInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cardsData = cardsResponse.data;
        const addressesData = addressesResponse.data;
        if (Array.isArray(cardsData) && cardsData.length > 0) {
          setSelectedCard(cardsData[0].id);
        }
        if (Array.isArray(addressesData) && addressesData.length > 0) {
          setSelectedAddress(addressesData[0].id);
        }
        // Ensure cardsData is an array before setting it else make it empty - shouldnt happen
        setSavedCards(Array.isArray(cardsData) ? cardsData : []);
        setSavedAddresses(addressesData || []);
      } catch (error) {
        console.error("Error fetching cards and addresses:", error);
      }
    };

    fetchSavedCardsAndAddresses();
  }, [token, subtotal, navigateTo]);

  const handlePlaceOrder = async () => {
    if (selectedCard === "") {
      alert("Please select a payment method.");
      return;
    }
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    // console.log(selectedAddress.id + " " + selectedCard.id);
    try {
      //create the order in the backend
      const response = await axios.post(
        "http://localhost:3000/checkout/createOrder",
        { cardId: selectedCard, addressId: selectedAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("resp", response.data);
      if (response.data.message === "Order created successfully.") {
        setOrderPlaced(true);
        localStorage.setItem("cart", []);
        setTimeout(() => {
          navigateTo("/");
        }, 1000);
      }
    } catch (err) {
      console.error("error while checking out", err);
      //alert(err.response);
    }
    // setOrderPlaced(true); // Show success message
  };

  return (
    <div className={styles.checkoutPageContainer}>
      {/* Left Section - Payment and Address Details */}
      <div className={styles.leftSection}>
        <h1>Checkout</h1>

        {/* payment Section */}
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
                onChange={(e) => {
                  console.log("selectedcard e.target.value", e.target.value);
                  setSelectedCard(e.target.value);
                }}
              >
                {Array.isArray(savedCards) && savedCards.length > 0 ? (
                  savedCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.cardType} **** **** **** {card.lastFourDigits} (Exp:{" "}
                      {card.expiry})
                    </option>
                  ))
                ) : (
                  <option value="">No cards available</option>
                )}
              </select>
              <div>
                <br />
                <Link to={"/account"} style={{ textDecoration: "none" }}>
                  <button className={styles.redirectButton}>
                    Different Card?
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* address section */}
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
                onChange={(e) => {
                  console.log("selectedaddress e.target.value", e.target.value);
                  setSelectedAddress(e.target.value);
                }}
              >
                {savedAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.zipcode}
                  </option>
                ))}
              </select>
              <div>
                <br />
                <Link
                  to={"/accInfo/address"}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.redirectButton}>
                    Different Address?
                  </button>
                </Link>
              </div>
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

          {/* line*/}
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
