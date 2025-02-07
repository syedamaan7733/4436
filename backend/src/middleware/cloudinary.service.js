// Required dependencies
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const auth = require("../middleware/auth");
const User = require("../models/User");
const stream = require("stream");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

// Utility function for uploading to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    console.log("hey");
    console.log(fileBuffer);

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return reject(new Error("Failed to upload image"));
        }
        resolve(result.secure_url);
      }
    );

    // Write the buffer to the upload stream and finalize
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

// Multer setup for storing image in memory
const upload = multer({ storage: multer.memoryStorage() });

module.exports = { uploadToCloudinary, upload };
