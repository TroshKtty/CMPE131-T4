import {
  Box,
  Card,
  CardOverflow,
  AspectRatio,
  CardContent,
  Typography,
  Button,
} from "@mui/joy";
import "./product-card.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, key }) {
  const navigate = useNavigate();

  const addToCart = (product) => {
    console.log(product);
    alert(`${product.name} added to cart`);
  };

  const navigateToProductPage = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`);
  };

  return (
    <Card
      variant="soft"
      color="neutral"
      size="lg"
      key={key}
      sx={{ "--Card-radius": "8px", width: "256px" }}
    >
      <CardOverflow>
        <AspectRatio ratio="1">
          <img
            src={product.images.split(";")[0] ?? "https://placehold.co/300x300"}
            alt={product.name}
            onClick={() => navigateToProductPage(product)}
            style={{ cursor: "pointer" }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              level="title-md"
              component="a"
              href={`/product/${product.name}`}
              sx={{ textDecoration: "none" }}
            >
              {product.name}
            </Typography>
          </Box>
        </Box>
        <Box
          gap={8}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>${product.price}</Typography>
          <Typography>{product.weight} lbs</Typography>
        </Box>
        <Box>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            sx={{
              "--Button-radius": "4px",
              width: "100%",
              display: "block",
            }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  key: PropTypes.number.isRequired,
};
