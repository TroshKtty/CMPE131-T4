import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Divider,
  Grid,
  Link,
  Sheet,
  Stack,
  Typography,
  Select,
  Option,
  FormControl,
  FormLabel,
  Container,
  IconButton,
  Drawer,
} from "@mui/joy";
import { Filter, SortDesc } from "lucide-react";
import ProductCard from "@/components/product-card/product-card";
import Loader from "@/components/loader/loader";

const CategorySidebar = ({ onCategoryChange, activeCategory, categories }) => (
  <Stack spacing={1} sx={{ maxWidth: "fit-content" }}>
    <Typography level="h2" sx={{ mb: 1 }}>
      Categories
    </Typography>
    <Divider />
    <Stack spacing={0.5}>
      <Link
        component="button"
        onClick={() => onCategoryChange("")}
        sx={{
          p: 1,
          borderRadius: "sm",
          fontWeight: activeCategory === "" ? "lg" : "md",
          bgcolor: activeCategory === "" ? "primary.softBg" : "transparent",
          color: activeCategory === "" ? "primary.plainColor" : "inherit",
          "&:hover": {
            bgcolor: "primary.softHoverBg",
            textDecoration: "none",
          },
        }}
      >
        All Products
      </Link>
      {Object.values(categories).map((cat) => (
        <Link
          key={cat}
          component="button"
          onClick={() => onCategoryChange(cat)}
          sx={{
            p: 1,
            borderRadius: "sm",
            fontWeight: activeCategory === cat ? "lg" : "md",
            bgcolor: activeCategory === cat ? "primary.softBg" : "transparent",
            color: activeCategory === cat ? "primary.plainColor" : "inherit",
            "&:hover": {
              bgcolor: "primary.softHoverBg",
              textDecoration: "none",
            },
          }}
        >
          {cat}
        </Link>
      ))}
    </Stack>
  </Stack>
);

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price_asc");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category")?.toLowerCase() || "";
  const category = categories[categoryParam] || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/all");

        console.log("resp", response.data);

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
      } catch (error) {
        console.log("An error occurred while fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = products.filter(
      (product) =>
        (query === "" || product.name.toLowerCase().includes(query)) &&
        (category === "" || product.category === category)
    );

    sorted = sortProducts(sorted, sortBy);
    setFilteredProducts(sorted);
  }, [products, query, category, sortBy]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory) {
      setSearchParams({
        category: encodeURIComponent(newCategory.toLowerCase()),
      });
    } else {
      setSearchParams({});
    }
    setDrawerOpen(false);
  };

  const sortProducts = (products, sortOption) => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "weight_asc":
          return a.weight - b.weight;
        case "weight_desc":
          return b.weight - a.weight;
        default:
          return 0;
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Sheet sx={{ bgcolor: "background.body", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Mobile Header */}
          <Grid xs={12} sx={{ display: { sm: "none" }, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography level="h2" sx={{ flex: 1 }}>
                {category
                  ? category
                  : query
                  ? `Results: "${query}"`
                  : "All Products"}
              </Typography>
              <IconButton
                variant="outlined"
                onClick={() => setDrawerOpen(true)}
                sx={{ p: 1 }}
              >
                <Filter size={20} />
              </IconButton>
              <FormControl size="sm" sx={{ minWidth: "auto" }}>
                <Select
                  value={sortBy}
                  onChange={(_, value) => setSortBy(value)}
                  startDecorator={<SortDesc size={16} />}
                  sx={{ minWidth: 100 }}
                >
                  <Option value="price_asc">Price ↑</Option>
                  <Option value="price_desc">Price ↓</Option>
                  <Option value="weight_asc">Weight ↑</Option>
                  <Option value="weight_desc">Weight ↓</Option>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Desktop Sidebar */}
          <Grid xs={0} sm={3} sx={{ display: { xs: "none", sm: "block" } }}>
            <CategorySidebar
              onCategoryChange={handleCategoryChange}
              activeCategory={category}
              categories={categories}
            />
          </Grid>

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{ display: { sm: "none" } }}
          >
            <Box sx={{ width: 280, p: 2 }}>
              <CategorySidebar
                onCategoryChange={handleCategoryChange}
                activeCategory={category}
                categories={categories}
              />
            </Box>
          </Drawer>

          {/* Main Content */}
          <Grid xs={12} sm={9}>
            {/* Desktop Header */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <Typography level="h2">
                {category
                  ? category
                  : query
                  ? `Search Results for "${query}"`
                  : "All Products"}
              </Typography>
              <FormControl size="sm">
                <FormLabel>Sort by</FormLabel>
                <Select
                  value={sortBy}
                  onChange={(_, value) => setSortBy(value)}
                  startDecorator={<SortDesc size={16} />}
                  sx={{ minWidth: 180 }}
                >
                  <Option value="price_asc">Price: Low to High</Option>
                  <Option value="price_desc">Price: High to Low</Option>
                  <Option value="weight_asc">Weight: Low to High</Option>
                  <Option value="weight_desc">Weight: High to Low</Option>
                </Select>
              </FormControl>
            </Box>

            {/* Products Grid */}
            <Grid container spacing={2}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <Grid
                    key={idx}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Grid xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 4,
                      bgcolor: "background.level1",
                      borderRadius: "sm",
                    }}
                  >
                    <Typography level="body1">
                      No products found matching your criteria.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
