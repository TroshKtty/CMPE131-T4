import PRODUCTS from "@/data";
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

const CATEGORIES = {};
for (const cat of [...new Set(PRODUCTS.map((product) => product.category))]) {
  // lowercase + url-encoded category -> proper casing of category
  CATEGORIES[encodeURI(cat.toLowerCase())] = cat;
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category")?.toLowerCase() || "";
  const category = CATEGORIES[categoryParam] || "";

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/product_test');
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  //}, [setFilteredProducts, query, category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products'); //was http://34.173.36.191:3000/api/products
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  
  useEffect(() => {
    setFilteredProducts(
      PRODUCTS.filter(
        (product) =>
          (query === "" || product.item.toLowerCase().includes(query)) &&
          (category === "" || product.category === category)
      )
    );
  }, [setFilteredProducts, query, category]);

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

  const _addToCart = (ev, product) => {
    console.log(product);
    alert(`${product.item} added to cart`);
  };

  const navigateToProductPage = (product) => {
    navigate(`/product/${encodeURI(product.item)}`);
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
              {Object.values(CATEGORIES).map((cat, idx) => (
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
                        src={product.imgUrl ?? "https://placehold.co/300x300"}
                        alt={product.item}
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
                          href={`/product/${product.item}`}
                          sx={{ textDecoration: "none" }}
                        >
                          {product.item}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      gap={8}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography>${product.price.toFixed(2)}</Typography>
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
                        onClick={(ev) => _addToCart(ev, product)}
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
