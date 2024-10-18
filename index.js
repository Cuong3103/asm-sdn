const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/mydb");

// Import routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// Routes
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
