const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groups");

// Get all groups
router.get("/", groupController.getAllGroups);

// Get one group by the id
router.get("/:id", groupController.getOneGroup);

module.exports = router;
