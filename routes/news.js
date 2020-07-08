const express = require("express");
const router = express.Router();

const newsController = require("../controllers/news");

// Get all news
router.get("/", newsController.getAllNews);

// Get one news by the id
router.get("/:id", newsController.getOneNews);

module.exports = router;
