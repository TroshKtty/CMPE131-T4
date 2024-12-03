import {
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { SlidersHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles.css";

import CategorySidebar from "@/components/category-sidebar/category-sidebar";
import Loader from "@/components/loader/loader";
import ProductGrid from "@/components/product-grid/product-grid";

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "weight_asc", label: "Weight: Low to High" },
  { value: "weight_desc", label: "Weight: High to Low" },
  { value: "most_popular", label: "Most Popular" },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("most_popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      } catch (error) {
        console.error("An error occurred while fetching all products:", error);
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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar for larger screens */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <CategorySidebar
              onCategoryChange={handleCategoryChange}
              activeCategory={category}
              categories={categories}
            />
          </Grid>

          {/* Main content area */}
          <Grid item xs={12} md={9}>
            {/* Upper section */}
            <Sheet
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                mb: 3,
                borderRadius: "sm",
              }}
            >
              <Typography level="h2">
                {query === ""
                  ? category !== ""
                    ? category
                    : "All Products"
                  : `Search results for "${query}"`}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Select
                  defaultValue={"Most Popular"}
                  value={sortBy}
                  onChange={(_, value) => setSortBy(value)}
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ display: { xs: "inline-flex", md: "none" } }}
                >
                  <SlidersHorizontalIcon />
                </IconButton>
              </Box>
            </Sheet>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <Typography level="h3" textAlign="center" mt={4}>
                No products found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Drawer for mobile category selection */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <CategorySidebar
            onCategoryChange={handleCategoryChange}
            activeCategory={category}
            categories={categories}
          />
        </Box>
      </Drawer>
    </Sheet>
  );
}
