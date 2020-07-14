require('dotenv').config();
const express = require('express');

const app = express();

const news = require('./routes/news.js');

const events = require('./routes/events.js');

const rounds = require('./routes/rounds.js');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Router
app.use('/news', news);

app.use('/events', events);

app.use('/rounds', rounds);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Erreur server');
  } else {
    console.log(`Server is listening on ${process.env.PORT}`);
  }
});
