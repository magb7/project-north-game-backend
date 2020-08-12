const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user");

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

// Get user info
router.get("/:id", userController.getUserInfo);

module.exports = router;
