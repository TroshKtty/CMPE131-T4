import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});

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
          newCategories[encodeURI(cat.toLowerCase())] = cat;
        }
        setCategories(newCategories);

        console.log("resp", response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
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

  const handleCategoryChange = (newCategory) => {
    if (newCategory) {
      setSearchParams({ category: encodeURI(newCategory.toLowerCase()) });
    } else {
      setSearchParams({});
    }
  };

  const handleAllProducts = () => {
    setSearchParams({});
  };

  const addToCart = (product) => {
    console.log(product);
    alert(`${product.name} added to cart`);
  };

  const navigateToProductPage = (product) => {
    navigate(`/product/${encodeURI(product.name)}`);
  };

  return (
    <Box
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
                <Card
                  variant="soft"
                  color="neutral"
                  size="lg"
                  key={idx}
                  sx={{ "--Card-radius": "8px", width: "256px" }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="1">
                      <img
                        src={
                          product.images.split(";")[0] ??
                          "https://placehold.co/300x300"
                        }
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
              ))
            ) : (
              <p>
                Sorry, we couldn&apos;t find any products matching your search.
              </p>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
