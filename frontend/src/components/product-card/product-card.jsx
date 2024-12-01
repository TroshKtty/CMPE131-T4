import { useCart } from "@/hooks/useCart";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Input,
  Typography,
} from "@mui/joy";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./product-card.module.css";

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleInputQuantityChange = (ev) => {
    const newQuantity = Number.parseInt(ev.target.value, 10);
    if (!Number.isNaN(newQuantity) && newQuantity >= 0) {
      handleBtnQuantityChange(newQuantity);
    }
  };

  const handleBtnQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Card className={styles.productCard}>
      <AspectRatio className={styles.productCardImgContainer} ratio="1">
        <img
          className={styles.productCardImg}
          src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
          alt={product.name}
        />
      </AspectRatio>
      <CardContent className={styles.productCardBodyContainer}>
        <Typography level="title-md">{product.name}</Typography>
        <Typography level="body-sm" sx={{ mb: "auto" }}>
          {product.weight} lbs
        </Typography>
        <Typography
          level="title-lg"
          sx={{ color: "primary.500", marginY: "4px" }}
        >
          ${product.price}
        </Typography>
        <div style={{ height: "40px" }}>
          {quantity === 0 ? (
            <Button
              fullWidth
              variant="solid"
              startDecorator={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
              sx={{ mt: 1 }}
            >
              Add to Cart
            </Button>
          ) : (
            <div className={styles.productCardInCartButtonContainer}>
              <IconButton
                className={styles.cartQuantityButton}
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => handleBtnQuantityChange(quantity - 1)}
              >
                <Minus size={16} />
              </IconButton>
              <Input
                className={styles.inputContainer}
                size="sm"
                value={quantity}
                onChange={handleInputQuantityChange}
                slotProps={{
                  input: {
                    min: 0,
                    max: 99, // ?
                    step: 1,
                    type: "number",
                  },
                }}
                sx={{
                  textAlign: "center",
                  // Removes the up/down arrows for a number input
                  "& .MuiInput-input": {
                    textAlign: "center",
                    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    "&[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
              <IconButton
                className={styles.cartQuantityButton}
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => handleBtnQuantityChange(quantity + 1)}
              >
                <Plus size={16} />
              </IconButton>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
  }).isRequired,
};
