import ProductCard from "@/components/product-card/product-card";
import { Grid } from "@mui/joy";
import PropTypes from "prop-types";

export default function ProductGrid({ products }) {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 4, md: 8, lg: 12 }} // 2 cols -> 4 cols -> 3 cols
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: { xs: 2, md: 3 },
      }}
    >
      {products.map((product, index) => (
        <Grid key={String(product.id ?? index)} xs={4} sm={4} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};
