import {
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
} from "@mui/joy";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import TextWithTooltip from "../text-with-tooltip/text-with-tooltip";
import "./product-card.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const addToCart = (ev) => {
    ev.stopPropagation();

    console.log(product);
    alert(`${product.name} added to cart`);
  };

  const navigateToProductPage = () => {
    navigate(`/product/${encodeURIComponent(product.id)}`);
  };

  return (
    <Card
      className="product-card"
      variant="outlined"
      sx={{
        "--Card-radius": "8px",
      }}
      onClick={navigateToProductPage}
    >
      <CardOverflow sx={{ backgroundColor: "transparent" }}>
        <img
          className="product-image"
          src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
          alt={product.name}
        />
      </CardOverflow>

      <CardContent className="product-container">
        <Divider />
        <Box className="product-details">
          <span onClick={navigateToProductPage}>
            {/* 320px is the max width of the product card */}
            <TextWithTooltip text={product.name} maxWidth={320} />
          </span>
        </Box>

        <Box className="product-details">
          <Typography level="body-sm">${product.price}</Typography>
          <Typography level="body-xs">{product.weight} lbs</Typography>
        </Box>

        <Button
          className="add-to-cart"
          variant="solid"
          color="primary"
          fullWidth
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
