const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const auth = require("../middleware/auth");
const User = require("../models/User");
const {
  uploadToCloudinary,
  upload,
} = require("../middleware/cloudinary.service");

// PATCH route for updating user data
router.patch("/update", auth, upload.single("profileImg"), async (req, res) => {
  try {
    const { name, email, hobbies, bio } = req.body;
    const userId = req.user.userId;

    // Validate email if provided
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Parse hobbies if provided
    let parsedhobbies = null;
    if (hobbies) {
      try {
        parsedhobbies = JSON.parse(hobbies);
      } catch (error) {
        return res.status(400).json({ error: "Invalid hobbies format" });
      }
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Upload profile image to Cloudinary if provided
    let profileImgUrl = user.profileImg;
    if (req.file) {
      try {
        profileImgUrl = await uploadToCloudinary(
          req.file.buffer,
          "user_profiles"
        );

      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.hobbies = parsedhobbies || user.hobbies;
    user.bio = bio || user.bio;
    user.profileImg = profileImgUrl;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hobbies: user.hobbies,
        bio: user.bio,
        profileImg: user.profileImg,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
