require("dotenv").config();

const sequelize = require("./config");
const express = require("express");
const cors = require("cors");

const auth_route = require("./routes/auth_routes");
const pending_route = require("./routes/pending_routes");
const productRoute = require("./routes/product");
const Product = require("./models/product");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", auth_route);
app.use("/users", pending_route);
app.use("/products", productRoute);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Connected to the database, and synced successfully.");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log("An error occured while starting the server:", error);
  }
}

startServer();
