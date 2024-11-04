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
import AdminSidebar from "@/components/admin_navbar/admin_navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ApprovalRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.post("http://localhost:3000/users/pendingAll", {}); 
        //const data = await response.json();
        setRequests(response.data.pending_users);
      } catch(err) {
        setError(err.message);
        alert(error);
      }
    };

    /*const fetchHistory = async () =>{
      try{
        const response = await axios.post("http://localhost:3000/users/approvedHistory", {});
        setHistory(response.data.approved_users);
      }catch(error){
        setError(error.message);
      }
    }

    fetchHistory();*/
    fetchRequests();
  }, []);

  const handleDecision = (user_id, decision) => {
    const user = requests.find((request) => request.user_id === user_id);
    if (user) {
      const decision_date = getCurrentDate();
      const requester_id = user_id;
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const user_id_approver = jwtDecode(token).user_id;
      axios.post("http://localhost:3000/users/decision", {requester_id, decision, decision_date, user_id_approver});
      /*setHistory([...history, { ...user, status: decision, decisionDate }]);*/
      setRequests(requests.filter((request) => request.user_id !== user_id));
    }
  };

  const handleRevoke = (id) => {
    const entry = history.find((entry) => entry.id === id);
    if (entry) {
      setRequests([...requests, { ...entry, requestDate: entry.decisionDate }]);
      setHistory(history.filter((entry) => entry.id !== id));
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AdminSidebar />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              <Box>
                <TabList>
                  <Tab label="Pending Requests" value={0} sx={{borderRadius: "7px"}}> Pending Requests </Tab>
                  <Tab label="Approval History" value={1} sx={{borderRadius: "7px"}}> Approval Requests </Tab>
                </TabList>
              </Box>

              <TabPanel value={0}>
                {/* Pending Requests */}
                <Box sx={{ mb: 4 }}>
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <Box
                        key={request.user_id}
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
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "black" }}
                          >
                            Name: {request.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Requested on: {request.created_at}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Email: {request.email}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Role: {request.role}
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            variant="solid"
                            sx={{
                              mr: 1,
                              backgroundColor: "#5271ff",
                              color: "white",
                            }}
                            onClick={() =>
                              handleDecision(request.user_id, "true")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="solid"
                            color="danger"
                            onClick={() => handleDecision(request.user_id, "false")}
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
              </TabPanel>

              <TabPanel value={1}>
                {/* Approval History */}
                <Box>
                  
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
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", color: "black" }}
                          >
                            {entry.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            Requested on: {entry.requestDate}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            {entry.status} on: {entry.decisionDate}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color: entry.status === "Approved" ? "blue" : "red",
                            }}
                          >
                            {entry.status}
                          </Typography>
                          <Button
                            variant="solid"
                            color="danger"
                            onClick={() => handleRevoke(entry.id)}
                            sx={{ ml: 2 }}
                          >
                            Revoke
                          </Button>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: "black" }}>
                      No history yet.
                    </Typography>
                  )}
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};


export default ApprovalRequestsPage;