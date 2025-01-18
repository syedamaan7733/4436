const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/auth.route");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://4436.vercel.app"], // Replace with your frontend URL
    credentials: true, // Allow credentials
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  return res.json({ msg: "Things working fine" });
});
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
