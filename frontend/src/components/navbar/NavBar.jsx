import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import {
  Box,
  Button,
  Divider,
  Dropdown,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Typography,
} from "@mui/joy";
import {
  Clipboard,
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  User,
  UserRound,
  X,
  ChartBar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./navbar.css";

export default function NavBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cart } = useCart();
  const { isLoggedIn, logout, userRole } = useAuth();

  // useEffect(() => {
  //   console.log("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (ev) => {
    ev.preventDefault();
    if (query.length < 3) return;
    const target = new URLSearchParams({ q: query }).toString();
    navigate(`/search?${target}`);
  };

  const handleLogout = () => logout(false);

  const clearSearch = () => setQuery("");

  return (
    <Sheet
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        bgcolor: "primary.solidBg",
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
          <Button onClick={() => navigate("/")}>
            <Typography textColor="common.white" fontWeight="lg" fontSize="xl">
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {isLoggedIn && (
              <Button
                startDecorator={<ShoppingCart size={20} />}
                onClick={() => navigate("/cart")}
              >
                <Typography textColor="common.white">
                  Cart {cart.length > 0 ? `(${cart.length})` : ""}
                </Typography>
              </Button>
            )}
            {isLoggedIn ? (
              <Dropdown>
                <MenuButton
                  variant="plain"
                  startDecorator={<User size={20} color="white" />}
                >
                  <Typography textColor="common.white">Menu</Typography>
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem onClick={() => navigate("/account")}>
                    <Typography
                      sx={{
                        "&:hover": {
                          color: "primary.solidBg",
                        },
                      }}
                    >
                      Account Information
                    </Typography>
                  </MenuItem>
                  {["employee", "admin"].includes(userRole) && (
                    <MenuItem
                      onClick={() => {
                        if (userRole === "employee") {
                          navigate("/employee");
                        } else {
                          navigate("/admin");
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          "&:hover": {
                            color: "primary.solidBg",
                          },
                        }}
                      >
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}{" "}
                        Dashboard
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => navigate("/accinfo/orders")}>
                    <Typography
                      sx={{
                        "&:hover": {
                          color: "primary.solidBg",
                        },
                      }}
                    >
                      Order History
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      "&:hover": {
                        "& .MuiTypography-root": {
                          color: "primary.solidBg",
                        },
                      },
                    }}
                  >
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Dropdown>
            ) : (
              <Button
                startDecorator={<User size={20} />}
                onClick={() => navigate("/login")}
              >
                <Typography textColor="common.white">Log In</Typography>
              </Button>
            )}
          </Box>
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ display: { xs: "flex", md: "none" }, color: "common.white" }}
          >
            <MenuIcon />
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
          {isLoggedIn ? (
            <>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => navigate("/cart")}
                startDecorator={<ShoppingCart size={20} />}
                fullWidth
                sx={{ color: "common.white" }}
              >
                Cart {cart.length > 0 ? `(${cart.length})` : ""}
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => navigate("/account")}
                startDecorator={<UserRound size={20} />}
                sx={{ color: "common.white" }}
                fullWidth
              >
                Account Information
              </Button>
              {["employee", "admin"].includes(userRole) && (
                <Button
                  variant="plain"
                  color="neutral"
                  fullWidth
                  startDecorator={<ChartBar size={20} />}
                  sx={{ color: "common.white" }}
                  onClick={() => {
                    if (userRole === "employee") {
                      navigate("/employee");
                    } else {
                      navigate("/admin");
                    }
                  }}
                >
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}{" "}
                  Dashboard
                </Button>
              )}
              <Button
                variant="plain"
                color="neutral"
                onClick={() => navigate("/orders")}
                fullWidth
                startDecorator={<Clipboard size={20} />}
                sx={{ color: "common.white" }}
              >
                Order History
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={handleLogout}
                fullWidth
              >
                <Typography textColor="common.white">Logout</Typography>
              </Button>
            </>
          ) : (
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<User size={20} />}
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ color: "common.white" }}
            >
              Log In
            </Button>
          )}
        </Box>
      )}
    </Sheet>
  );
}
