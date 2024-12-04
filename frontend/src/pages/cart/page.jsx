import CartItem from "@/components/cart-item/cart-item";
import Loader from "@/components/loader/loader";
import { useCart } from "@/hooks/useCart";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/joy";
import { ShoppingBasketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export default function CartPage() {
  const navigate = useNavigate();

  const { cart, hasCartInit } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);

  useEffect(() => {
    //console.log(cart);
    if (!Array.isArray(cart)) return;

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    setSubtotal(total);
    setFreeShipping(total < 20);
  }, [cart]);

  const handleCheckout = () => {
    const shipping = freeShipping ? 0 : 5;
    console.log(shipping + " " + subtotal);
    navigate("/checkout", { state: { subtotal, shipping} });
  };

  if (!hasCartInit) {
    return <Loader />;
  }

  // I don't think this'll ever happen, because this should already be dealt with in CartController
  if (!Array.isArray(cart)) {
    return (
      <Typography level="h4">
        There was an issue loading your cart. Please try again later.
      </Typography>
    );
  }

  if (cart.length === 0) {
    return (
      <Box className={styles.emptyCartContainer}>
        <ShoppingBasketIcon size={128} />
        <Typography level="h1">Your cart is waiting for you!</Typography>
        <Typography level="title-md">
          It seems like you haven&apos;t added any items yet. Start exploring
          and find something you love!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {/* Items in cart */}
      <Grid xs={12} md={8}>
        <Card variant="soft" className={styles.cartItem}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "8px",
              }}
            >
              {/* <Box
                sx={{ display: { xs: "none", sm: "inline-flex", mt: 4, p: 0 } }}
              >
                {<ShoppingBagIcon size={24} sx={{ mt: 8, p: 2 }} />}
              </Box> */}
              <Typography level="h3">Shopping Cart</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography level="h3">
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
          <Box
            className={styles.cartItemStack}
            sx={{
              maxHeight: { xs: "40vh", md: "70vh" },
            }}
          >
            {cart.map((product, index) => (
              <div key={String(index)} className={styles.cartItem}>
                <CartItem key={product.id} product={product} />
              </div>
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Order summary */}
      <Grid xs={12} md={4}>
        <Card
          variant="soft"
          sx={{
            position: "sticky",
          }}
        >
          <Typography level="h3" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Stack spacing={2}>
            <div className={styles.summaryItem}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </div>
            <div className={styles.summaryItem}>
              <Typography>Shipping</Typography>
              <Typography>{freeShipping ? "Free" : "$5"}</Typography>
            </div>
            <div className={styles.summaryItem}>
              <Typography level="h6">Estimated Total</Typography>
              <Typography level="h6">
                ${(subtotal + (freeShipping ? 0 : 5)).toFixed(2)}
              </Typography>
            </div>
            <Button
              fullWidth
              size="lg"
              color="primary"
              onClick={handleCheckout}
            >
              Continue to Checkout
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
