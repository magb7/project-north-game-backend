const { connection } = require("../conf");
const getAllEvents = async (req, res) => {
  try {
    let { author = "", title = "", eventDate = "" } = req.query;
    let sqlRequest =
      "SELECT id, title, event_date as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event";
    const sqlRequestQuery =
      "SELECT id, title, event_date as eventDate, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR MONTH(event_date) =? AND YEAR(event_date) = YEAR(CURRENT_DATE)";
    if (author) {
      author = `${author}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (title) {
      title = `${title}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (eventDate) {
      dateEvent = `%${eventDate}%`;
      sqlRequest = sqlRequestQuery;
    }
    // get all events or searchbar for the event

    const [data] = await connection.query(sqlRequest, [
      author,
      title,
      eventDate,
    ]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the events.");
  }
};

module.exports = { getAllEvents };
