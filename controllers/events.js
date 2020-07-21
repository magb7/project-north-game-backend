const passport = require("passport");
const express = require("express");
const router = express.Router();
const { connection } = require("../conf");
const getAllEvents = async (req, res) => {
  try {
    let { author = "", title = "", minDate = "", maxDate = "" } = req.query;
    let sqlRequest =
      'SELECT event.id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, creation_date AS creationDate, is_published, user.name AS author, picture_url as pictureUrl FROM event JOIN user ON user.id = author_id';
    const sqlRequestQuery =
      'SELECT event.id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, creation_date AS creationDate, is_published, user.name AS author, picture_url as pictureUrl FROM event JOIN user ON user.id = author_id WHERE user.name = ? OR title LIKE ? OR event_date BETWEEN ? AND ?';
    if (author) {
      authorId = `${author}`;
      sqlRequest = sqlRequestQuery;
    }
    if (title) {
      title = `${title}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (minDate && maxDate) {
      sqlRequest = sqlRequestQuery;
    }
    // get all events or searchbar for the event

    const [data] = await connection.query(sqlRequest, [
      author,
      title,
      minDate,
      maxDate,
    ]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the events.");
  }
};

const getOneEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // get one event
    const [
      data,
    ] = await connection.query(
      'SELECT event.id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, creation_date AS creationDate, is_published, user.name AS author, picture_url as pictureUrl FROM event JOIN user ON user.id = author_id WHERE event.id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the event.");
  }
};

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

const createEvent = async (req, res) => {
  try {
    const event = await connection.query("INSERT INTO event SET ?", [req.body]);

    return res.status(200).send(event);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while creating the event.");
  }
};

module.exports = { getAllEvents, getOneEvent, createEvent };
