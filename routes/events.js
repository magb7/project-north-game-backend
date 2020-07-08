const express = require("express");
const router = express.Router();

const eventController = require("../controllers/events");

// Get all news
router.get("/", eventController.getAllEvents);

// Get one news by the id
router.get("/:id", eventController.getOneEvent);

module.exports = router;
