const express = require("express");
const router = express.Router();
const userController = require("../controller/auth.controller");
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", auth, userController.getProfile);
router.post("/logout", userController.logout);

module.exports = router;
