import { useCart } from "@/hooks/useCart";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Sheet,
  Typography,
} from "@mui/joy";
import { CircleMinusIcon, CirclePlusIcon } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./cart-item.module.css";
import { useNavigate } from "react-router-dom";

export default function CartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      variant="plain"
      className={styles.cartItemCard}
      sx={{
        boxShadow: "md",
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ gap: 2, alignItems: "center" }}
      >
        <AspectRatio
          ratio="1"
          sx={{
            width: 128,
            flexShrink: 0,
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          <img
            src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
            alt={product.name}
            className={styles.cartItemImage}
            onClick={handleClick}
          />
        </AspectRatio>
        <Sheet className={styles.detailsContainer}>
          <Typography level="title-lg" sx={{ cursor: "pointer" }}>
            <p onClick={handleClick}>{product.name}</p>
          </Typography>
          <Typography level="body-sm">
            Unit Price: ${product.price}/lb
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "normal", sm: "center" },
              gap: { xs: 2, sm: 8 },
              marginTop: "1.5px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                disabled={product.quantity <= 1}
              >
                <CircleMinusIcon size={18} />
              </IconButton>
              <Typography textAlign="center">{product.quantity}</Typography>
              <IconButton
                size="sm"
                variant="soft"
                color="neutral"
                onClick={() => updateQuantity(product.id, product.quantity + 1)}
              >
                <CirclePlusIcon size={18} />
              </IconButton>
            </Box>
            <Button
              size="sm"
              variant="soft"
              color="danger"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </Button>
            <Typography level="title-md">
              ${(product.price * product.quantity).toFixed(2)}
            </Typography>
          </Box>
        </Sheet>
      </CardContent>
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