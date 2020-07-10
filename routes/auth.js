const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// Create new city
router.post("/signup", authController.createUser);

module.exports = router;
