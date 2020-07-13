const { connection } = require('../conf');
const getAllRounds = async (req, res) => {
  try {
    let { author = '', title = '' } = req.query;
    let sqlRequest =
      'SELECT id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl FROM round';
    if (author) {
      author = `${author}%`;
      sqlRequest =
        'SELECT id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl FROM round WHERE author LIKE ? OR title LIKE ?';
    }
    if (title) {
      title = `${title}%`;
      sqlRequest =
        'SELECT id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl FROM round WHERE author LIKE ? OR title LIKE ?';
    }
    // get all games or searchbar for the rounds

    const [data] = await connection.query(sqlRequest, [author, title]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send('Error while reading the rounds.');
  }
};
const getOneRound = async (req, res) => {
  const { id } = req.params;
  try {
    // get one round
    const [
      data,
    ] = await connection.query(
      'SELECT id,DATE_FORMAT(creation_date, "%D %b %Y" ) as creationDate, revision_date as revisionDate, author, title, content, picture_url as pictureUrl FROM round WHERE id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error while reading the rounds.');
  }
};

module.exports = { getAllRounds, getOneRound };
