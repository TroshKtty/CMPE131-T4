import CartItem from "@/components/cart-item/cart-item";
import { useCart } from "@/hooks/useCart";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/joy";
import { ShoppingBagIcon, ShoppingBasketIcon } from "lucide-react";
import styles from "./styles.module.css";
import Loader from "@/components/loader/loader";

export default function CartPage() {
  const { cart, hasCartInit } = useCart();

  if (!hasCartInit) {
    return <Loader />;
  }

  if (!Array.isArray(cart)) {
    return (
      <Typography level="h4">
        There was an issue loading your cart. Please try again later.
      </Typography>
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const estimatedTotal = cartTotal;

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
        <Card variant="soft">
          <div className={styles.cartHeader}>
            <ShoppingBagIcon size={24} sx={{ mt: 8 }} />
            <Typography level="h3">Shopping Cart</Typography>
          </div>
          <Stack spacing={2}>
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </Stack>
        </Card>
      </Grid>
      {/* Order summary */}
      <Grid xs={12} md={4}>
        <Card>
          <Typography level="h3" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Stack spacing={2}>
            <div className={styles.summaryItem}>
              <Typography>Subtotal</Typography>
              <Typography>${cartTotal.toFixed(2)}</Typography>
            </div>
            <div className={styles.summaryItem}>
              <Typography level="h6">Estimated Total</Typography>
              <Typography level="h6">${estimatedTotal.toFixed(2)}</Typography>
            </div>
            <Button fullWidth size="lg" color="primary">
              Continue to Checkout
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
