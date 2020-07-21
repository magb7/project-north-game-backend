const express = require("express");
const router = express.Router();

const eventController = require("../controllers/events");

// Get all news
router.get("/", eventController.getAllEvents);

// Get one news by the id
router.get("/:id", eventController.getOneEvent);

// -------------------- Auth wall
router.use((req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, msg) => {
    if (err) {
      console.log("----");
      console.log(err);
      return res.status(500).send(err);
    }
    if (!user) {
      console.log("----");
      console.log("No user found");
      return res.sendStatus(500);
    }

    next();
  })(req, res);
});
// -------------------- / Auth wall

// Post one event if you're authenticate
router.post("/", eventController.createEvent);

module.exports = router;
