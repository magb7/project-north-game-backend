const { connection } = require("../conf");
const getAllEvents = async (req, res) => {
  try {
    let { author = "", title = "", minDate = "", maxDate = "" } = req.query;
    let sqlRequest =
      'SELECT id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event';
    const sqlRequestQuery =
      'SELECT id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR event_date BETWEEN ? AND ?';
    if (author) {
      author = `${author}%`;
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
      'SELECT id, title, DATE_FORMAT(event_date, "%D %b %Y" ) as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event WHERE id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the event.");
  }
};

module.exports = { getAllEvents, getOneEvent };
