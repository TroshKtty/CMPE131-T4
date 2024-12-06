import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Input,
  FormControl,
  FormHelperText,
  Card,
  CardContent,
  Stack,
  Divider,
  Link,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  //get all the address on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/userInfo/addressInfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  //backend call to add new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/userInfo/addAddress",
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses((prev) => [...prev, response.data.address]);
      setNewAddress({ street: "", city: "", state: "", zipcode: "" });
    } catch (error) {
      console.error("Failed to add address", error);
    }
  };

  //backend call to remove an address
  const handleDeleteAddress = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/userInfo/removeAddress`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  //pretty page
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: "#f4f5f7",
          color: "common.white",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            fontSize="1.5rem"
            fontWeight="bold"
            sx={{ color: "#5271ff" }}
          >
            Your Account
          </Typography>
          <Link
            component={RouterLink}
            to="/account"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Personal Information
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/payment"
            sx={{ color: "black", fontSize: "1.3rem" }}
          >
            Billing & Payments
          </Link>
          <Link
            component={RouterLink}
            to="/accinfo/address"
            sx={{ color: "#5271ff", fontSize: "1.3rem" }}
          >
            Address Info
          </Link>
        </Box>
      </Box>

      {/* Addresses from the backend */}
      <Box sx={{ flexGrow: 1, padding: 4, overflowY: "scroll" }}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Your Addresses
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {addresses.length > 0 ? (
          <Stack spacing={2} sx={{ mb: 4 }}>
            {addresses.map((address) => (
              <Card key={address.id} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography level="body1">
                      {address.street}, {address.city}, {address.state}{" "}
                      {address.zipcode}
                    </Typography>
                    <Button
                      variant="soft"
                      color="danger"
                      onClick={() => handleDeleteAddress(address.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography level="body1" sx={{ mb: 4 }}>
            No addresses found
          </Typography>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* form to add a new address */}
        <Typography level="h5" sx={{ mb: 3 }}>
          Add New Address
        </Typography>

        <form onSubmit={handleAddAddress}>
          <Stack spacing={2} sx={{ maxWidth: 400 }}>
            <FormControl required>
              <FormHelperText>Street</FormHelperText>
              <Input
                name="street"
                value={newAddress.street}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required>
              <FormHelperText>City</FormHelperText>
              <Input
                name="city"
                value={newAddress.city}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required>
              <FormHelperText>State</FormHelperText>
              <Input
                name="state"
                value={newAddress.state}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required>
              <FormHelperText>Zipcode</FormHelperText>
              <Input
                name="zipcode"
                value={newAddress.zipcode}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" sx={{ mt: 2 }}>
              Add Address
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddressPage;
