const { connection } = require('../conf');
const getAllRounds = async (req, res) => {
  try {
    let { name = '', place = '' } = req.query;
    let sqlRequest =
      'SELECT round.id AS roundId, user.name AS roundCreator, round.name AS roundName, DATE_FORMAT(round_date, "%D %b %Y" ) AS roundDate, place AS roundPlace, user.name AS roundCreator, image AS roundImage FROM round JOIN user ON author_id = user.id';
    if (name) {
      name = `${name}%`;
      sqlRequest =
        'SELECT round.id AS roundId, round.name AS roundName, SUBSTR(content, 1, 100) as roundContent, image AS roundImage FROM round WHERE name LIKE ? OR place LIKE ?';
    }
    if (place) {
      place = `${place}%`;
      sqlRequest =
        'SELECT round.id AS roundId, round.name AS roundName, SUBSTR(content, 1, 100) as roundContent, image AS roundImage FROM round WHERE name LIKE ? OR title LIKE ?';
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
      'SELECT round.id AS roundId, user.name AS roundCreator, round.name AS roundName, DATE_FORMAT(round_date, "%D %b %Y" ) AS roundDate, place AS roundPlace, user.name AS roundCreator, image AS roundImage FROM round JOIN user ON author_id = user.id WHERE round.id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Error while reading the rounds.');
  }
};

module.exports = { getAllRounds, getOneRound };
