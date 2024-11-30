import { useCart } from "@/hooks/useCart";
import styles from "./styles.module.css";
import {
  AspectRatio,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  IconButton,
} from "@mui/joy";
import { CirclePlus, CircleMinus } from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (!Array.isArray(cart)) {
    return (
      <Typography level="h4">
        There was an issue loading your cart. Please try again later.
      </Typography>
    );
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const estimatedTotal = subtotal;

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid xs={12} md={8}>
        <Card>
          <Typography level="h3" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <Stack spacing={2}>
              {cart.map((product) => (
                <Card key={product.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid xs={4} sm={3}>
                      <AspectRatio ratio="1" objectFit="cover">
                        <img
                          src={
                            product.images.split(";")[0] ??
                            "https://placehold.co/400x300"
                          }
                          alt={product.name}
                          className={styles.cartItemImage}
                        />
                      </AspectRatio>
                    </Grid>
                    <Grid xs={8} sm={9}>
                      <Stack spacing={1}>
                        <Typography level="h6">{product.name}</Typography>
                        <Typography>Price: ${product.price}</Typography>
                        <div className={styles.quantityControl}>
                          <IconButton
                            size="sm"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity - 1)
                            }
                            disabled={product.quantity <= 1}
                          >
                            <CircleMinus />
                          </IconButton>
                          <Typography>{product.quantity}</Typography>
                          <IconButton
                            size="sm"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity + 1)
                            }
                          >
                            <CirclePlus />
                          </IconButton>
                        </div>
                        <Button
                          variant="soft"
                          color="danger"
                          onClick={() => removeFromCart(product.id)}
                          sx={{ alignSelf: "flex-start" }}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          )}
        </Card>
      </Grid>
      <Grid xs={12} md={4}>
        <Card>
          <Typography level="h3" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Stack spacing={2}>
            <div className={styles.summaryItem}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
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
