const express = require("express");
const router = express.Router();

const newsController = require("../controllers/group");

// Get all news
router.get("/", newsController.getAllGroup);

// Get one news by the id
router.get("/:id", newsController.getOneGroup);

module.exports = router;
