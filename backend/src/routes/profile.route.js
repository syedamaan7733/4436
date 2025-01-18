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
  // console.log("leak");

  try {
    const { name, email, hobby, bio } = req.body;
    console.log(JSON.parse(hobby), bio, email);
    // Retrieve the authenticated user's ID from the token
    const userId = req.user.userId;

    

    // // Upload profile image to Cloudinary if provided
    // let profileImgUrl = user.profileImg; // Retain the existing image if not updated
    // if (req.file) {
    //   profileImgUrl = await uploadToCloudinary(
    //     req.file.buffer,
    //     "user_profiles"
    //   );
    // }

    // // Update user fields
    // user.name = name || user.name;
    // user.email = email || user.email;
    // user.hobby = hobby ? hobby.split(",") : user.hobby; // Expecting hobbies as a comma-separated string
    // user.bio = bio || user.bio;
    // user.profileImg = profileImgUrl;

    // // Save the updated user
    // await user.save();

    // res.json({
    //   message: "User profile updated successfully",
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     hobby: user.hobby,
    //     bio: user.bio,
    //     profileImg: user.profileImg,
    //   },
    // });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
