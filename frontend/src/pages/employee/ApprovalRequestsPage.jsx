import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ApprovalRequestEmployeePage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, name: "John Nolan", requestDate: "4/9/2024" },
    { id: 2, name: "Jasmine Liu", requestDate: "6/10/2024" },
    { id: 3, name: "Alice Brown", requestDate: "8/10/2024" },
  ]);

  const [history, setHistory] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

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
          onClick={() => navigate('/employee')}
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
            Employee Access Requests
          </Typography>

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

export default ApprovalRequestEmployeePage;