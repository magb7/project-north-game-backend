const { connection } = require("../conf");
const getAllNews = async (req, res) => {
  const { author, title } = req.query;

  try {
    // get all news or searchbar for the news
    const [data] = await connection.query([author, title]);

    if (author) {
      console.log(author);
      `SELECT id, title, SUBSTR(content, 1, 100), picture_url as pictureUrl FROM news WHERE author LIKE '?%' `;
    }
    // if (title) {
    //   console.log(title);
    //   sqlRequest += ` WHERE title LIKE '?%' `;
    // }

    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
    console.log("author", author);

    return res.status(500).send("Error while reading the news.");
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

module.exports = { getAllNews, getOneNews };
