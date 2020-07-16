const { connection } = require('../conf');
const getAllRounds = async (req, res) => {
  try {
    let { name = '', place = '' } = req.query;
    let sqlRequest =
      'SELECT round.id AS roundId, user.name AS roundCreator, SUBSTR(round.name, 1, 50) AS roundName, DATE_FORMAT(round_date, "%D %b %Y" ) AS roundDate, place AS roundPlace, round.image AS roundImage, game.name AS gameName FROM round JOIN user ON author_id = user.id JOIN game ON game.id=round.game_id';
    if (name) {
      name = `${name}%`;
      sqlRequest =
        'SELECT round.id AS roundId, round.name AS roundName, SUBSTR(content, 1, 100) AS roundContent, image AS roundImage FROM round WHERE name LIKE ? OR place LIKE ?';
    }
    if (place) {
      place = `%${place}%`;
      sqlRequest =
        'SELECT round.id AS roundId, round.name AS roundName, SUBSTR(content, 1, 100) AS roundContent, image AS roundImage FROM round WHERE name LIKE ? OR place LIKE ?';
    }
    // get all games or searchbar for the rounds

    const [data] = await connection.query(sqlRequest, [name, place]);
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
      'SELECT round.id AS roundId, user.name AS roundCreator, round.name AS roundName, content AS roundContent, DATE_FORMAT(round_date, "%D %b %Y" ) AS roundDate, DATE_FORMAT(round_date, "%H:%i" ) AS roundTime, DATE_FORMAT(creation_date, "%D %b %Y" ) AS creationDate, DATE_FORMAT(revision_date, "%D %b %Y" ) AS revisionDate, is_private, place AS roundPlace, image AS roundImage, avatar_url AS roundAvatar, max_players FROM round JOIN user ON author_id = user.id WHERE round.id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error while reading the rounds.');
  }
};

module.exports = { getAllRounds, getOneRound };
