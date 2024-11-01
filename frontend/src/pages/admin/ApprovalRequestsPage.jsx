import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/joy";

const ApprovalRequestsPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("pending");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleApprovalChange = (e) => {
    setApprovalStatus(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted:", inputValue, approvalStatus);
    // Add any submit logic here
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#f4f6f8",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
      >
        Approval Requests
      </Typography>

      {/* Input Field */}
      <FormControl sx={{ mb: 3 }}>
        <FormLabel sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
          Enter Details:
        </FormLabel>
        <Input
          placeholder="Enter some data"
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "6px",
            borderColor: "#ccc",
          }}
        />
      </FormControl>

      {/* Radio Group for Approval Status */}
      <FormControl sx={{ mb: 3 }}>
        <FormLabel sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
          Approval Status
        </FormLabel>
        <RadioGroup
          row
          value={approvalStatus}
          onChange={handleApprovalChange}
          sx={{
            display: "flex",
            justifyContent: "space-between", // Spreads out the radio buttons
            width: "100%", // Ensures the group takes up full width
          }}
        >
          <Radio value="approved" label="Approve" />
          <Radio value="denied" label="Deny" />
          <Radio value="pending" label="Pending" />
        </RadioGroup>
      </FormControl>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        sx={{
          display: "block",
          width: "100%",
          padding: "12px",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#5271ff",
          color: "white",
          "&:hover": {
            backgroundColor: "#4059c1",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ApprovalRequestsPage;


