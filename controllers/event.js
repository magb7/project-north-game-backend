const { connection } = require("../conf");
const getAllEvents = async (req, res) => {
  try {
    let { author = "", title = "", dateEvent = "" } = req.query;
    let sqlRequest =
      "SELECT id, title, date_event as dateEvent, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event";
    if (author) {
      author = `${author}%`;
      sqlRequest =
        "SELECT id, title, date_event as dateEvent, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR adress LIKE ?";
    }
    if (title) {
      title = `${title}%`;
      sqlRequest =
        "SELECT id, title,date_event as dateEvent, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR adress LIKE ?";
    }

    if (adress) {
      adress = `%${adress}%`;
      sqlRequest =
        "SELECT id, title,date_event as dateEvent, adress, event_latitude as eventLatitude, event_longitude as eventLongitude, description, author, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR adress LIKE ?";
    }

    if (dateEvent) {
      dateEvent = `%${dateEvent}%`;
      sqlRequest =
        "SELECT id, title,date_event as dateEvent, adress, description, author, picture_url as pictureUrl FROM event WHERE author LIKE ? OR title LIKE ? OR adress LIKE ?";
    }
    // get all events or searchbar for the event

    const [data] = await connection.query(sqlRequest, [
      dateEvent,
      title,
      adress,
      author,
    ]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the events.");
  }
};
const getOneNews = async (req, res) => {
  const { id } = req.params;
  try {
    // get all news
    const [
      data,
    ] = await connection.query(
      "SELECT id,creation_date as creationDate, release_date as releaseDate, revision_date as revisionDate, is_published as isPublished, author, title, content, picture_url as pictureUrl FROM news WHERE id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the news.");
  }
};

module.exports = { getAllEvent, getOneNews };
