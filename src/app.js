require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { createPaymentIntent } = require("./api/controllers/paymentController");
const { analyzeSEO } = require("./api/services/analyzeSEO");

const app = express();

// DB Connection
require("./config/db");

// Middleware
app.use(cors({ exposedHeaders: ["X-Total-Count", "Content-Range"] }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use("/", (req, res) => {
//   res.send("Hello user");
// });

// Routes
app.use("/api/auth", require("./api/routes/authRoutes"));
app.use("/api/products", require("./api/routes/productRoutes"));
app.use("/api/users", require("./api/routes/userRoutes"));

//create payment intent
app.use("/api/payment", require("./api/routes/paymentRoutes"));

// Error Handling Middleware
// app.use(require("./api/middlewares/errorHandler"));

// Route for SEO analysis
app.post("/api/seo-check", async (req, res) => {
  try {
    const url = req.body.url;
    console.log("check url", url);
    const result = await analyzeSEO(url);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    res.status(500).send("Error analyzing SEO");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
