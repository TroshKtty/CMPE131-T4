import ProductCard from "@/components/product-card/product-card";
import { Grid } from "@mui/joy";
import PropTypes from "prop-types";

export default function ProductGrid({ products }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        "--Grid-columnSpacing": "16px",
        "--Grid-rowSpacing": "24px",
      }}
    >
      {products.map((product) => (
        <Grid key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      images: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
