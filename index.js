require("dotenv").config();
const express = require("express");

const app = express();

const news = require("./routes/news.js");
const events = require("./routes/events.js");
const auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/news", news);
app.use("/events", events);
// app.use("/auth", auth);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Erreur server");
  } else {
    console.log(`Server is listening on ${process.env.PORT}`);
  }
});
