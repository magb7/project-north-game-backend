require("dotenv").config();
const express = require("express");

const app = express();

const news = require("./routes/news.js");
const events = require("./route/events.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/news", news);

app.use("/events", events);

app.listen(5000, (err) => {
  if (err) {
    console.log("Erreur server");
  } else {
    console.log("Server is listening on 5000");
  }
});
