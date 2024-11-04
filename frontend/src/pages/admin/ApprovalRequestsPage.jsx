import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import "./styles.css";


// const ApprovalRequestsPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [approvalStatus, setApprovalStatus] = useState("pending");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleApprovalChange = (e) => {
//     setApprovalStatus(e.target.value);
//   };

//   const handleSubmit = () => {
//     console.log("Submitted:", inputValue, approvalStatus);
//     // Add any submit logic here
//   };

const ApprovalRequestsPage = () => {
  const navigate = useNavigate();
  // Initial sample data for users requesting access with request date
  const [requests, setRequests] = useState([
    { id: 1, name: "Sebastian Brown", requestDate: "4/9/2024" },
    { id: 2, name: "Mike Jones", requestDate: "6/10/2024" },
    { id: 3, name: "Hayden Bitten", requestDate: "8/10/2024" },
  ]);

  // History of approved/denied requests
  const [history, setHistory] = useState([]);

  // Get current date in MM/DD/YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Handle approval or denial of a request
  const handleDecision = (id, decision) => {
    const user = requests.find((request) => request.id === id);
    if (user) {
      const decisionDate = getCurrentDate();
      setHistory([...history, { ...user, status: decision, decisionDate }]);
      setRequests(requests.filter((request) => request.id !== id));
    }
  };

  return (
    <>
<Box component="nav" className="navbar">
        <Typography
          style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', cursor: 'pointer' }}
          onClick={() => navigate('/admin')}
        >
          OFS
        </Typography>
      </Box>

<Box component="main" className="main-content">

    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f4f6f8",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "black" }}
      >
        Admin Access Requests
      </Typography>

      {/* Pending Requests */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
          Pending Requests
        </Typography>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Box
              key={request.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "white",
                borderRadius: "6px",
                mb: 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "black" }}>
                  {request.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  Requested on: {request.requestDate}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="solid"
                  sx={{ mr: 1, backgroundColor: "#5271ff", color: "white" }}
                  onClick={() => handleDecision(request.id, "Approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => handleDecision(request.id, "Denied")}
                >
                  Deny
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "black" }}>
            No pending requests.
          </Typography>
        )}
      </Box>

      {/* Approval History */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "black" }}>
          Approval History
        </Typography>
        {history.length > 0 ? (
          history.map((entry, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#f0f0f0",
                borderRadius: "6px",
                mb: 1,
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "black" }}>
                  {entry.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  Requested on: {entry.requestDate}
                </Typography>
                <Typography variant="body2" sx={{ color: "black" }}>
                  {entry.status} on: {entry.decisionDate}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: entry.status === "Approved" ? "blue" : "red" }}
              >
                {entry.status}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "black" }}>
            No history yet.
          </Typography>
        )}
        </Box>
      </Box>
    </Box>
    </>
  );
};
export default ApprovalRequestsPage;



// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Typography,
//   Radio,
//   RadioGroup,
// } from "@mui/joy";

// const ApprovalRequestsPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [approvalStatus, setApprovalStatus] = useState("pending");

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleApprovalChange = (e) => {
//     setApprovalStatus(e.target.value);
//   };

//   const handleSubmit = () => {
//     console.log("Submitted:", inputValue, approvalStatus);
//     // Add any submit logic here
//   };



//   return (
//     <Box
//       sx={{
//         padding: 4,
//         maxWidth: "600px",
//         margin: "auto",
//         backgroundColor: "#f4f6f8",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Typography
//         variant="h4"
//         sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
//       >
//         Approval Requests
//       </Typography>

//       {/* Input Field */}
//       <FormControl sx={{ mb: 3 }}>
//         <FormLabel sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
//           Enter Details:
//         </FormLabel>
//         <Input
//           placeholder="Enter some data"
//           value={inputValue}
//           onChange={handleInputChange}
//           sx={{
//             padding: "10px",
//             fontSize: "1rem",
//             borderRadius: "6px",
//             borderColor: "#ccc",
//           }}
//         />
//       </FormControl>

//       {/* Radio Group for Approval Status */}
//       <FormControl sx={{ mb: 3 }}>
//         <FormLabel sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
//           Approval Status
//         </FormLabel>
//         <RadioGroup
//           row
//           value={approvalStatus}
//           onChange={handleApprovalChange}
//           sx={{
//             display: "flex",
//             justifyContent: "space-between", // Spreads out the radio buttons
//             width: "100%", // Ensures the group takes up full width
//           }}
//         >
//           <Radio value="approved" label="Approve" />
//           <Radio value="denied" label="Deny" />
//           <Radio value="pending" label="Pending" />
//         </RadioGroup>
//       </FormControl>

//       {/* Submit Button */}
//       <Button
//         onClick={handleSubmit}
//         sx={{
//           display: "block",
//           width: "100%",
//           padding: "12px",
//           fontSize: "1rem",
//           fontWeight: "bold",
//           backgroundColor: "#5271ff",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "#4059c1",
//           },
//         }}
//       >
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default ApprovalRequestsPage;
