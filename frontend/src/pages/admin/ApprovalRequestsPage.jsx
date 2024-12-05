import { useState, useEffect } from "react";
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

const ApprovalRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/pendingAll",
          {headers: { Authorization: `Bearer ${token}` }}
        );
        //const data = await response.json();
        setRequests(response.data.pending_users);
      } catch (err) {
        setError(err.message);
        // alert(error);
      }
    };
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/approved_users",
          {headers: { Authorization: `Bearer ${token}` }}
        );
        setHistory(response.data.user_history);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHistory();
    fetchRequests();
  }, []);

  const handleDecision = async(user_id, decision) => {
    const user = requests.find((request) => request.user_id === user_id);
    if (user) {
      const decision_date = getCurrentDate();
      const requester_id = user_id;
      await axios.post("http://localhost:3000/users/decision",{
        requester_id,
        decision,
        decision_date,
      },
      {headers: { Authorization: `Bearer ${token}` }}
    );
      setRequests(requests.filter((request) => request.user_id !== user_id));
    }
  };

  const handleRevoke = (id) => {
    const entry = history.find((entry) => entry.id === id);
    if (entry) {
      setHistory(history.filter((entry) => entry.id !== id));
    }
    axios.post("http://localhost:3000/users/revoke_access", {id}, {headers: { Authorization: `Bearer ${token}` }});
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
                  <Tab
                    label="Pending Requests"
                    value={0}
                    sx={{ borderRadius: "7px" }}
                  >
                    {" "}
                    Pending Requests{" "}
                  </Tab>
                  <Tab
                    label="Approval History"
                    value={1}
                    sx={{ borderRadius: "7px" }}
                  >
                    {" "}
                    Approved Users{" "}
                  </Tab>
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
                          backgroundColor: "#c4d9ed",
                          borderRadius: "6px",
                          mb: 2,
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Box>
                          <Typography variant="body1" sx={{ color: "black" }}>
                            <b>Name:</b> {request.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            <b>Requested on:</b> {request.created_at}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            <b>Email:</b> {request.email}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "black" }}>
                            <b>Role:</b> {request.role}
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            color="success"
                            variant="solid"
                            sx={{
                              mr: 1,
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
                            onClick={() =>
                              handleDecision(request.user_id, "false")
                            }
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
                    history.map((entry) => (
                      <Box
                        key={entry.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: 2,
                          backgroundColor: "#c4d9ed",
                          borderRadius: "6px",
                          mb: 2,
                          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        {/* Basic Info */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <Typography variant="body1" sx={{ color: "black" }}>
                              <b>Name: </b>
                              {entry.name} (user id - {entry.user_id})
                            </Typography>
                            <Typography variant="body2" sx={{ color: "black" }}>
                              <b>Role: </b>
                              {entry.role}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Toggle More Info */}
                        {showDetails[entry.id] && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: "black" }}>
                              <b>Approved by: </b>
                              {entry.approved_by} (user id - {entry.approved_by_id})
                            </Typography>
                            <Typography variant="body2" sx={{ color: "black" }}>
                            <b>Approved on: </b>
                            {entry.approved_at}
                            </Typography>
                          </Box>
                        )}

                        {/* Action Buttons */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <Button
                            onClick={() => toggleDetails(entry.id)}
                            sx={{ mr: 1, color: "white" }}
                          >
                            {showDetails[entry.id] ? "Less Info" : "More Info"}
                          </Button>
                          <Button
                            variant="solid"
                            color= {"danger"}
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