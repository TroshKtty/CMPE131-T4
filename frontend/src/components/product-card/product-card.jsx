import {
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Tooltip,
  Typography,
} from "@mui/joy";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./product-card.css";

export default function ProductCard({ product, key }) {
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
      variant="outlined"
      sx={{
        width: 320,
        height: 400,
        boxShadow: "lg",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "--Card-radius": "8px",
      }}
      onClick={navigateToProductPage}
      key={key}
    >
      <CardOverflow sx={{ backgroundColor: "transparent" }}>
        <img
          src={product.images.split(";")[0] ?? "https://placehold.co/400x300"}
          alt={product.name}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "256px",
          }}
        />
      </CardOverflow>

      <CardContent
        sx={{
          gap: 1.5,
          mt: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* TODO: this doesnt work properly */}
          <Tooltip title={product.name} placement="top">
            <Typography
              level="title-lg"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                // TODO: this isnt crossplatform, apparently
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                cursor: "help",
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Typography level="body-sm">${product.price}</Typography>
          <Typography level="body-xs">{product.weight} lbs</Typography>
        </Box>

        <Button
          variant="solid"
          color="primary"
          fullWidth
          sx={{ marginTop: -0.5 }}
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
    price: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    images: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  key: PropTypes.number.isRequired,
};
