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
import { useSearchParams } from "react-router-dom";

const CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  useEffect(() => {
    const filtered = PRODUCTS.filter(
      (product) =>
        (query === "" ||
          product.item
            .toLowerCase()
            .includes(query.toLowerCase())) /* filter by name */ &&
        (selectedCategory === "" ||
          product.category.toLowerCase() ===
            selectedCategory.toLowerCase()) /* filter by category */
    );
    setFilteredProducts(filtered);
  }, [query, selectedCategory]);

  useEffect(() => {
    // update on initial render
    const q = searchParams.get("q");
    const cat = searchParams.get("category");

    setQuery(q?.toLowerCase() || "");
    setSelectedCategory(cat?.toLowerCase() || "");
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setQuery("");
    setSearchParams({});
  };

  const handleAllProducts = () => {
    setSelectedCategory("");
    setQuery("");
    setSearchParams({});
  };

  const _addToCart = (ev, product) => {
    console.log(product);
    alert(`${product.item} added to cart`);
  };

  // TODO: separatae these components
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
                  fontWeight: selectedCategory === "" ? "bold" : "normal",
                  color: selectedCategory === "" ? "primary.main" : "inherit",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                All Products
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  level="body1"
                  onClick={() => handleCategoryChange(category)}
                  sx={{
                    fontWeight:
                      selectedCategory === category ? "bold" : "normal",
                    color:
                      selectedCategory === category
                        ? "primary.main"
                        : "inherit",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  {category}
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
              {selectedCategory
                ? `${selectedCategory}`
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
                        <Typography level="title-md">{product.item}</Typography>
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
