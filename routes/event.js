const express = require("express");
const router = express.Router();

const newsController = require("../controllers/events");

// Get all news
router.get("/", newsController.getAllEvents);

// Get one news by the id
// router.get("/:id", newsController.getOneEvent);

module.exports = router;
