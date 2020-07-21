const express = require("express");
const router = express.Router();
const passport = require("passport");

const groupController = require("../controllers/groups");

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

// Get all groups
router.get("/", groupController.getAllGroups);

// Get one group by the id
router.get("/:id", groupController.getOneGroup);

module.exports = router;
