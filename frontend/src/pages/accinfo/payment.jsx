import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Link,
  Card,
  CardContent,
  Divider,
  Button,
  Input,
  Stack,
} from "@mui/joy";
import "react-multi-carousel/lib/styles.css";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

export default function PaymentInfoPage() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  //user's saved cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/userInfo/cardInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCards(response.data.filter((e) => e !== null && e !== undefined));
      } catch (err) {
        setError("Failed to fetch cards.");
        console.log(err);
      }
    };
    fetchCards();
  }, [token]);

  //new card
  const handleAddCard = async (e) => {
    e.preventDefault();
    const { cardNumber, expiry, cvv } = newCard;

    if (!cardNumber || !expiry || !cvv) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/userInfo/addCard",
        { cardNumber, expiry, cvv },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCards([...cards, response.data]); // Add the new card to the list
        setNewCard({ cardNumber: "", expiry: "", cvv: "" }); // Reset the form
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  // remove card
  const handleRemoveCard = async (cardId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/userInfo/removeCard`,
        { cardId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove the card from the list
        setCards(cards.filter((card) => card.id !== cardId));
      }
    } catch (err) {
      setError("Failed to remove the card.");
      console.log(err);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" , overflow:"hidden"}}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: "#f4f5f7",
          color: "common.white",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ color: "#5271ff" }}
          >
            Your Account
          </Typography>
          <Link
            component={RouterLink}
            to="/account"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Personal Information
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/payment"
            sx={{ color: "#5271ff", fontSize: "1.3rem" }}
          >
            Billing & Payments
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/address"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Address Info
          </Link>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 4, overflowY: "scroll"}}>
        <Typography
          fontSize="2.5rem"
          fontWeight="bold"
          align="left"
          sx={{ color: "black" }}
        >
          Manage Payment Methods
        </Typography>
        <Divider />

        {/* Saved Cards */}
        <Box sx={{ marginTop: 4 }}>
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ marginBottom: 2 }}
          >
            Saved Cards
          </Typography>
          {cards.length > 0 ? (
            cards.map((card) => (
              <Card key={card.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography fontSize="1.3rem" fontWeight="bold">
                    Card Ending in {card.lastFourDigits}
                  </Typography>
                  <Typography fontSize="1.25rem">
                    Expiry: {card.expiry}
                  </Typography>
                  <Typography fontSize="1.25rem">
                    Type: {card.cardType}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveCard(card.id)}
                    sx={{ marginTop: 1 }}
                  >
                    Remove Card
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No saved cards found.</Typography>
          )}
        </Box>

        {/* Add New Card */}
        <Box sx={{ marginTop: 4 }}>
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ marginBottom: 2 }}
          >
            Add a New Card
          </Typography>
          {error && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleAddCard}>
            <Stack spacing={2}>
              {/* Card Number */}
              <Input
                placeholder="Card Number"
                value={newCard.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  // Only proceed if it's a potential valid number (max 16 digits)
                  if (value.length <= 16) {
                    const formatted = value
                      .match(/.{1,4}/g)
                      ?.join(" ")
                      .substring(0, 19);
                    setNewCard({ ...newCard, cardNumber: formatted });
                  }
                }}
                size="sm"
                sx={{ width: 300 }}
                inputProps={{ maxLength: 19 }}
                required
              />

              {/* Expiry Date */}
              <Input
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    // Only allow 4 digits total
                    let formatted = value;
                    if (value.length >= 2) {
                      const month = parseInt(value.substring(0, 2), 10);
                      // Only accept valid months 1-12
                      if (month >= 1 && month <= 12) {
                        formatted = value.substring(0, 2);
                        if (value.length > 2) {
                          formatted += `/${value.substring(2, 4)}`;
                        }
                        setNewCard({ ...newCard, expiry: formatted });
                      }
                    } else {
                      setNewCard({ ...newCard, expiry: formatted });
                    }
                  }
                }}
                size="sm"
                sx={{ width: 300 }}
                inputProps={{ maxLength: 5 }}
                required
              />

              {/* CVV */}
              <Input
                placeholder="CVV"
                value={newCard.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  // Only allow 3-4 digits (covers both regular cards and Amex)
                  if (value.length <= 4) {
                    setNewCard({ ...newCard, cvv: value });
                  }
                }}
                size="sm"
                sx={{ width: 300 }}
                inputProps={{ maxLength: 4 }}
                required
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="sm"
                sx={{ width: 150, fontSize: "0.875rem" }}
              >
                Add Card
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
