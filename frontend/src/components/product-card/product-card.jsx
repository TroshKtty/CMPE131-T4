import { AspectRatio, Button, Card, CardContent, Typography } from "@mui/joy";
import PropTypes from "prop-types";
import styles from "./product-card.module.css";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
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
        <Typography level="title-lg" sx={{ color: "primary.500" }}>
          ${product.price}
        </Typography>
        <Button
          fullWidth
          variant="solid"
          sx={{ mt: 1 }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
  }).isRequired,
};
