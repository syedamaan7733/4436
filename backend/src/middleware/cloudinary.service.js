// Required dependencies
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const auth = require("../middleware/auth");
const User = require("../models/User");
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function for uploading to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder,
      },
      fileBuffer
    );
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

// Multer setup for storing image in memory
const upload = multer({ storage: multer.memoryStorage() });


module.exports = {uploadToCloudinary, upload}