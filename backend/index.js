require("dotenv").config();

const express = require("express");
const sequelize = require("./config");
const cors = require("cors");
const auth_route = require("./routes/auth_routes");

const { ProductTest } = require("./models");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", auth_route);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// // Start server (Line 15 commented out)
// db.sequelize.sync().then((req) => {
// app.listen(PORT, () => {
//         console.log(`Server running on Port ${PORT}`);
//     });
// });

app.get("/api/product_test", async (req, res) => {
  try {
    const products = await ProductTest.findAll();
    res.json(products);
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

/*
// API endpoint to fetch products  DOESNT WORK
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
*/

// // Start server (Line 15 commented out)
// db.sequelize.sync().then((req) => {
// app.listen(PORT, () => {
//         console.log(`Server running on Port ${PORT}`);
//     });
// });

app.get('/api/product_test', async (req, res) => {
  try {
    const products = await Product.findAll(); // Retrieves all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.listen(PORT, () => {
        console.log(`Server running on Port ${PORT}`);
});

