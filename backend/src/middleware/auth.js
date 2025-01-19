const jwt = require("jsonwebtoken");

const getTokenFromRequest = (req) => {
  // Check Authorization header first (for localStorage implementation)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // Fall back to cookies
  return req.cookies?.token;
};

const auth = async (req, res, next) => {
  try {
    // Get token from either source
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        error: "Please authenticate",
        message:
          "No authentication token found in cookies or Authorization header",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user data to request
    req.user = decoded;

    // Optional: Check if token is about to expire and issue a new one
    const tokenExp = decoded.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeUntilExp = tokenExp - now;

    // If token will expire in less than 1 hour, issue a new one
    if (timeUntilExp < 3600000) {
      const newToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Send new token in both cookie and response header
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.setHeader("X-New-Token", newToken);
    }

    next();
  } catch (error) {
    // Handle specific JWT errors with detailed messages
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token",
        message: "The provided authentication token is malformed or invalid",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired",
        message: "Your authentication token has expired. Please log in again",
      });
    }

    // Handle other errors
    res.status(401).json({
      error: "Authentication failed",
      message: "An error occurred during authentication",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = auth;
