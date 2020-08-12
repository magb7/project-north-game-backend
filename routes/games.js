const express = require("express");
const router = express.Router();

const gameController = require("../controllers/games");

// Get all news
router.get("/", gameController.getAllGames);

// Get one news by the id
router.get("/:id", gameController.getOneGame);

module.exports = router;
