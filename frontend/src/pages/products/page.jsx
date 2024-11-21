import ProductCard from "@/components/product-card/product-card";
import { Box, Divider, Grid, Link, Sheet, Stack, Typography } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category")?.toLowerCase() || "";
  const category = categories[categoryParam] || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/all");
        setProducts(response.data);
        setFilteredProducts(response.data);

        const categoriesArr = [
          ...new Set(response.data.map((product) => product.category)),
        ];

        const newCategories = {};
        for (const cat of categoriesArr) {
          newCategories[encodeURIComponent(cat.toLowerCase())] = cat;
        }
        setCategories(newCategories);

        console.log("resp", response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          (query === "" || product.name.toLowerCase().includes(query)) &&
          (category === "" || product.category === category)
      )
    );
  }, [products, query, category]);

  useEffect(() => console.log(filteredProducts.length), [filteredProducts]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory) {
      setSearchParams({
        category: encodeURIComponent(newCategory.toLowerCase()),
      });
    } else {
      setSearchParams({});
    }
  };

  const handleAllProducts = () => {
    setSearchParams({});
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <Sheet
      sx={{ flexGrow: 1, p: 4, bgcolor: "background.body", minHeight: "100vh" }}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={4} margin={1}>
        {/* Sidebar */}
        <Grid xs={12} sm={4} md={3} lg={2.5}>
          <Box
            sx={{
              maxWidth: "fit-content",
            }}
          >
            <Typography level="h2">Browse</Typography>

            <Divider sx={{ my: 2 }} />

            <Stack direction="column" spacing={1}>
              <Link
                level="body1"
                onClick={handleAllProducts}
                sx={{
                  fontWeight: category === "" ? "bold" : "normal",
                  color: category === "" ? "primary.main" : "inherit",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                All Products
              </Link>
              {Object.values(categories).map((cat, idx) => (
                <Link
                  key={idx}
                  level="body1"
                  onClick={() => handleCategoryChange(cat)}
                  sx={{
                    fontWeight: category === cat ? "bold" : "normal",
                    color: category === cat ? "primary.main" : "inherit",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  {cat}
                </Link>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Main */}
        <Grid xs={12} sm={8} md={9} lg={9.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography level="h2">
              {category
                ? category
                : query
                ? `Search Results for "${query}"`
                : "All Products"}
            </Typography>
          </Box>
          <Grid container gap={4}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))
            ) : (
              <p>
                Sorry, we couldn&apos;t find any products matching your search.
              </p>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Sheet>
  );
}
