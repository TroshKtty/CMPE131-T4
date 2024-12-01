import PropTypes from "prop-types";
import { useCart } from "@/hooks/useCart";
import {
  Card,
  Grid,
  AspectRatio,
  Typography,
  Stack,
  IconButton,
  Button,
} from "@mui/joy";
import { CirclePlusIcon, CircleMinusIcon } from "lucide-react";

import styles from "./cart-item.module.css";

export default function CartItem({ product }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <Card variant="plain" key={product.id}>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={4} sm={3}>
          <AspectRatio ratio="1" objectFit="cover">
            <img
              src={
                product.images.split(";")[0] ?? "https://placehold.co/400x300"
              }
              alt={product.name}
              className={styles.cartItemImage}
            />
          </AspectRatio>
        </Grid>
        <Grid xs={8} sm={9}>
          <Stack spacing={1}>
            <div className={styles.itemDetails}>
              <Typography level="body-lg">{product.name}</Typography>
              <div className={styles.quantityControl}>
                <IconButton
                  size="sm"
                  onClick={() =>
                    updateQuantity(product.id, product.quantity - 1)
                  }
                  disabled={product.quantity <= 1}
                >
                  <CircleMinusIcon />
                </IconButton>
                <Typography>{product.quantity}</Typography>
                <IconButton
                  size="sm"
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                >
                  <CirclePlusIcon />
                </IconButton>
              </div>
              <Typography>Unit Price: ${product.price}/lb</Typography>
            </div>
            <div className={styles.itemPriceContainer}>
              <Typography level="h5">
                Total: ${(product.price * product.quantity).toFixed(2)}
              </Typography>
            </div>
            {/* <Button
              variant="soft"
              color="danger"
              onClick={() => removeFromCart(product.id)}
              sx={{ alignSelf: "flex-start" }}
            >
              Remove
            </Button> */}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
