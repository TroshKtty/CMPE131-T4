import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  TabPanel,
  TabList,
} from "@mui/joy";
import "./styles.css";
import EmployeeSidebar from "@/components/employee_navbar/employee_navbar"; // Assumes an employee-specific sidebar component
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const EmployeeApprovalRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees/pendingAll");
        setRequests(response.data.pending_employees || []);
      } catch (err) {
        setError(err.message);
        alert(error); 
      }
    };
    
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees/history");
        setHistory(response.data.employee_history || []);
      } catch (error) {
        setError(error.message);
      }
    };
    

    fetchHistory();
    fetchRequests();
  }, []);

  const handleDecision = (employee_id, decision) => {
    const employee = requests.find((request) => request.employee_id === employee_id);
    if (employee) {
      const decision_date = getCurrentDate();
      const requester_id = employee_id;
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const approver_id = jwtDecode(token).employee_id;
      axios.post("http://localhost:3000/employees/decision", {
        requester_id,
        decision,
        decision_date,
        approver_id,
      });
      setRequests(requests.filter((request) => request.employee_id !== employee_id));
    }
  };

  const handleRevoke = (id) => {
    axios.post("http://localhost:3000/employees/revoke", { id });
    setHistory(history.filter((entry) => entry.id !== id));
  };

  const toggleDetails = (entryId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [entryId]: !prevState[entryId],
    }));
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <EmployeeSidebar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              padding: 4,
              maxWidth: "800px",
              backgroundColor: "#f4f6f8",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => setTabValue(newValue)}
            >
              <TabList>
                <Tab label="Pending Requests" value={0}>
                  Pending Requests
                </Tab>
                <Tab label="Approval History" value={1}>
                  Approved Users
                </Tab>
              </TabList>
              <TabPanel value={0}>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <Box
                      key={request.employee_id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        backgroundColor: "#c4d9ed",
                        borderRadius: "6px",
                        mb: 2,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Name:</strong> {request.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Requested on:</strong> {request.created_at}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Email:</strong> {request.email}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Role:</strong> {request.role}
                      </Typography>
                      <Button
                        onClick={() => handleDecision(request.employee_id, true)}
                        sx={{ color: "green" }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleDecision(request.employee_id, false)}
                        sx={{ color: "red" }}
                      >
                        Deny
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography>No pending requests.</Typography>
                )}
              </TabPanel>
              <TabPanel value={1}>
                {history.length > 0 ? (
                  history.map((entry) => (
                    <Box
                      key={entry.id}
                      sx={{
                        padding: 2,
                        backgroundColor: "#c4d9ed",
                        borderRadius: "6px",
                        mb: 2,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Name:</strong> {entry.name} (user id - {entry.employee_id})
                      </Typography>
                      <Typography variant="body2">
                        <strong>Role:</strong> {entry.role}
                      </Typography>
                      {showDetails[entry.id] && (
                        <Typography variant="body2">
                          <strong>Approved by:</strong> {entry.approved_by} (user id - {entry.approved_by_id})
                          <strong>Approved on:</strong> {entry.approved_at}
                        </Typography>
                      )}
                      <Button
                        onClick={() => toggleDetails(entry.id)}
                      >
                        {showDetails[entry.id] ? "Less Info" : "More Info"}
                      </Button>
                      <Button
                        onClick={() => handleRevoke(entry.id)}
                        sx={{ color: "red" }}
                      >
                        Revoke
                      </Button>
                    </Box>
                  ))
                ) : (
                  <Typography>No history yet.</Typography>
                )}
              </TabPanel>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeApprovalRequestsPage;
