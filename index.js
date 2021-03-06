require("dotenv").config();
const express = require("express");
const app = express();

const rounds = require("./routes/rounds.js");
const news = require("./routes/news.js");
const events = require("./routes/events.js");
const games = require("./routes/games.js");
const groups = require("./routes/groups.js");
const auth = require("./routes/auth");
const user = require("./routes/user");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/news", news);
app.use("/games", games);
app.use("/events", events);
app.use("/auth", auth);
app.use("/groups", groups);
app.use("/rounds", rounds);
app.use("/users", user);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Erreur server");
  } else {
    console.log(`Server is listening on ${process.env.PORT}`);
  }
});
