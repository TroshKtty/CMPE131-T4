import Loader from "@/components/loader/loader";
import ProductCard from "@/components/product-card/product-card";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  ChipDelete,
  Container,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Option,
  Select,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import axios from "axios";
import {
  ChevronRight,
  Filter,
  Home,
  SortDesc,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles.css";

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "weight_asc", label: "Weight: Low to High" },
  { value: "weight_desc", label: "Weight: High to Low" },
];

const CategorySidebar = ({ onCategoryChange, activeCategory, categories }) => (
  <List
    sx={{
      "--List-decorator-size": "32px",
      "--List-item-paddingLeft": "8px",
      "--List-item-paddingY": "6px",
    }}
  >
    <ListItem>
      <Typography level="h4" sx={{ mb: 1 }}>
        Categories
      </Typography>
    </ListItem>
    <ListItem>
      <ListItemButton
        selected={activeCategory === ""}
        onClick={() => onCategoryChange("")}
      >
        All Products
      </ListItemButton>
    </ListItem>
    {Object.entries(categories).map(([key, value]) => (
      <ListItem key={key}>
        <ListItemButton
          selected={activeCategory === value}
          onClick={() => onCategoryChange(value)}
        >
          {value}
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default function ProductSearchPage() {
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
        console.error("An error occurred while fetching products:", error);
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
      <Container maxWidth="xl" sx={{ padding: 4 }}>
        <Sheet sx={{ bgcolor: "background.paper" }}>
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Typography level="body-md" noWrap>
              {category || query
                ? `Search Results for "${query}"`
                : "All Products"}
            </Typography>

            {/* On larger screens, we can display the typical select menu */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* <Typography
                level="body-md"
                sx={{
                  textWrap: "nowrap",
                  display: { xs: "none", sm: "inline-flex" },
                }}
              >
                Sort
              </Typography> */}
              <Select
                value={sortBy}
                onChange={(_, value) => setSortBy(value)}
                size="sm"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                {SORT_OPTIONS.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Box>

            {/* Otherwise, on smaller screens, a button will suffice */}
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                flexDirection: { xs: "row", sm: "unset" },
                justifyContent: { xs: "center", sm: "normal" },
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { sm: "none" } }}
              >
                <SlidersHorizontalIcon />
              </IconButton>
            </Box>
          </Sheet>
        </Sheet>
      </Container>

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
    </Sheet>
  );
}
