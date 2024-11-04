import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Sheet,
  Typography
} from "@mui/joy";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

export default function NavBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams, setQuery]);

  const handleSearch = (ev) => {
    ev.preventDefault();

    if (query.length < 3) {
      return;
    }

    const target = new URLSearchParams({ q: query }).toString();
    navigate(encodeURI(`/search?${target}`));
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <Sheet
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ px: { xs: 2, sm: 4 }, py: 1 }}
      >
        <Grid xs={6} sm={3} display="flex" alignItems="center">
          <Button
            variant="plain"
            color="primary"
            sx={{ color: "common.black" }}
            onClick={() => navigate("/")}
          >
            <Typography level="h1" fontSize="xl">
              OFS
            </Typography>
          </Button>
        </Grid>

        <Grid xs={12} sm={6} md={5} lg={6} order={{ xs: 3, sm: 2 }}>
          <form onSubmit={handleSearch}>
            <Input
              value={query}
              placeholder="Search for products"
              sx={{ width: "100%" }}
              onChange={(ev) => setQuery(ev.target.value)}
              endDecorator={
                <>
                  {query && (
                    <IconButton
                      onClick={clearSearch}
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <X size={16} />
                    </IconButton>
                  )}
                  <IconButton type="submit" size="sm">
                    <Search size={16} />
                  </IconButton>
                </>
              }
            />
          </form>
        </Grid>

        <Grid
          xs={6}
          sm={3}
          md={4}
          lg={3}
          order={{ xs: 2, sm: 3 }}
          display="flex"
          justifyContent="flex-end"
        >
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              variant="plain"
              color="primary"
              startDecorator={<ShoppingCart size={20} />}
              sx={{ color: "common.black" }}
              onClick={() => navigate("/cart")}
            >
              Cart
            </Button>
            <Button
              variant="plain"
              color="primary"
              startDecorator={<User size={20} />}
              sx={{ color: "common.black" }}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </Box>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ display: { xs: "flex", md: "none" }, color: "common.black" }}
          >
            <Menu />
          </IconButton>
        </Grid>
      </Grid>

      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          <Button
            fullWidth
            startDecorator={<ShoppingCart size={18} />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
          <Button
            fullWidth
            startDecorator={<User size={18} />}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Box>
      )}
    </Sheet>
  );
}
