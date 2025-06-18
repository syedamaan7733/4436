const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./src/config/database");
const authRoutes = require("./src/routes/auth.route");
const profileRoute = require("./src/routes/profile.route");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://4436-euiu.vercel.app",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
      "http://127.0.0.1:5502",
      "http://127.0.0.1:5503",
    ],
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
app.use("/api/profile", profileRoute);

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
