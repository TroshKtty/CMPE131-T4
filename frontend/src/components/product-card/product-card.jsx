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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cart, addToCart, updateCount, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth();

  const cartItem = cart.find((item) => item.id === product.id);
  const count = cartItem ? cartItem.count : 0;
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product, token);
  };

  const handleInputQuantityChange = (ev) => {
    const newQuantity = Number.parseInt(ev.target.value, 10);

    // Don't allow a quantity greater than what's available
    if (!Number.isNaN(newQuantity) && newQuantity <= product.quantity) {
      handleBtnCountChange(newQuantity);
    }
  };

  const handleBtnCountChange = (newQuantity) => {
    // Remove from cart
    if (newQuantity === 0) {
      // console.log(token);
      removeFromCart(product.id, token);
    } else {
      // Don't allow a quantity greater than what's available
      if (newQuantity > product.quantity) {
        return;
      }

      handleUpdateCount(newQuantity);
    }
  };

  const handleUpdateCount = (newCount) => {
    updateCount(product.id, newCount, token);
  };

  return (
    <Card className={styles.productCard}>
      <AspectRatio className={styles.productCardImgContainer} ratio="1">
        <img
          onClick={handleNavigate}
          className={styles.productCardImg}
          src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
          alt={product.name}
        />
      </AspectRatio>
      <CardContent className={styles.productCardBodyContainer}>
        <div onClick={handleNavigate} style={{ cursor: "pointer" }}>
          <Typography level="title-md">{product.name}</Typography>
        </div>
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
          {isLoggedIn ? (
            count === 0 ? (
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
                  onClick={() => handleBtnCountChange(count - 1)}
                >
                  <Minus size={16} />
                </IconButton>
                <Input
                  type="number"
                  className={styles.inputContainer}
                  size="sm"
                  value={count}
                  onChange={handleInputQuantityChange}
                  slotProps={{
                    input: {
                      min: 0,
                      max: product.quantity,
                      step: 1,
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
                  onClick={() => handleBtnCountChange(count + 1)}
                  disabled={count >= product.quantity}
                >
                  <Plus size={16} />
                </IconButton>
              </div>
            )
          ) : (
            <Button variant="soft" fullWidth onClick={() => navigate("/login")}>
              Sign In To Add
            </Button>
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
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
