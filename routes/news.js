const express = require("express");
const router = express.Router();
const passport = require("passport");

const newsController = require("../controllers/news");

// Get all news
router.get("/", newsController.getAllNews);

// Get one news by the id
router.get("/:id", newsController.getOneNews);

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
    //req.user = user;
    next();
  })(req, res);
});
// -------------------- / Auth wall

// Post one news
router.post("/", newsController.postNews);

module.exports = router;
