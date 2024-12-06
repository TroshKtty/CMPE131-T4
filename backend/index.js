require("dotenv").config();

const sequelize = require("./config");
const express = require("express");
const cors = require("cors");

const auth_route = require("./routes/auth_routes");
const pending_route = require("./routes/pending_routes");
const employeeRoutes = require('./routes/employee_routes');
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart_route");
const Product = require("./models/product");
const checkoutRoute = require("./routes/checkout_route");
const { auth, verifyPermission } = require("./middleware/auth");
const cookieParser = require('cookie-parser');
const userInfoRoute = require("./routes/userInfo_route");

const { setupAssociations } = require("./models/index");


const app = express();
const PORT = 3000;

setupAssociations();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", auth_route);
app.use("/users", auth, verifyPermission("admin"), pending_route);
app.use("/products", productRoute);
app.use('/employees', employeeRoutes);
app.use("/cart", auth, verifyPermission("customer"), cartRoute);
app.use("/checkout", auth, verifyPermission("customer"), checkoutRoute);
app.use("/userInfo", auth, userInfoRoute);

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
