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
} from "@mui/joy"; 

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // get addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userInfo/addressInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error("Failed to fetch addresses", error);
      }
    };
    fetchAddresses();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  // new address
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

  // remove address
  const handleDeleteAddress = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/userInfo/removeAddress`,{ id }, { headers: { Authorization: `Bearer ${token}` } }
      );
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4 }}>
      <Typography level="h4" fontWeight="bold">
        Your Addresses
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {addresses.length > 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {addresses.map((address) => (
            <Card key={address.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography level="h6" sx={{ fontWeight: "bold" }}>
                  {address.street}, {address.city}, {address.state} {address.zipcode}
                </Typography>
                <Button
                  variant="outlined"
                  color="danger"
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{ marginTop: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>No addresses found</Typography>
      )}

      <Divider sx={{ marginY: 4 }} />

      <Typography level="h5" fontWeight="bold">
        Add New Address
      </Typography>

      <form onSubmit={handleAddAddress}>
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, marginTop: 2 }}>
          <FormControl required>
            <FormHelperText>Street</FormHelperText>
            <Input
              name="street"
              value={newAddress.street}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl required>
            <FormHelperText>City</FormHelperText>
            <Input
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl required>
            <FormHelperText>State</FormHelperText>
            <Input
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl required>
            <FormHelperText>Zipcode</FormHelperText>
            <Input
              name="zipcode"
              value={newAddress.zipcode}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
            Add Address
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddressPage;
