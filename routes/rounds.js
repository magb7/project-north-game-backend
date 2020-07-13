const express = require('express');
const router = express.Router();

const newsController = require('../controllers/rounds');

// Get all rounds
router.get('/', newsController.getAllRounds);

// Get one round by the id
router.get('/:id', newsController.getOneRound);

module.exports = router;
