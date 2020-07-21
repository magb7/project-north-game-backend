const { connection } = require("../conf");
const getAllRounds = async (req, res) => {
  try {
    let { name = "", place = "" } = req.query;
    let sqlRequest =
      'SELECT round.id AS roundId, user.name AS roundCreator, SUBSTR(round.name, 1, 50) AS roundName, DATE_FORMAT(round.round_date, " %W, %d %M %Y" )AS roundDate, place AS roundPlace, round.image AS roundImage, game.name AS gameName FROM round JOIN user ON author_id = user.id JOIN game ON game.id=round.game_id';
    if (name) {
      name = `${name}%`;
      sqlRequest =
        "SELECT round.id AS roundId, round.name AS roundName, round.place AS place, SUBSTR(content, 1, 100) AS roundContent, image AS roundImage FROM round WHERE name LIKE ? OR place LIKE ?";
    }
    if (place) {
      place = `%${place}%`;
      sqlRequest =
        "SELECT round.id AS roundId, round.name AS roundName, round.place AS place, SUBSTR(content, 1, 100) AS roundContent, image AS roundImage FROM round WHERE name LIKE ? OR place LIKE ?";
    }
    // get all games or searchbar for the rounds

    const [data] = await connection.query(sqlRequest, [name, place]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the rounds.");
  }
};
const getOneRound = async (req, res) => {
  const { id } = req.params;
  try {
    // get one round
    const [data] = await connection.query(
      `SELECT round.id AS roundId, round.name AS roundName,round.place AS place,round.content AS roundContent, DATE_FORMAT(round.round_date, " %W, %d %M %Y" )AS roundDate, DATE_FORMAT(round.round_date, "%H:%i" ) AS roundTime, DATE_FORMAT(round.creation_date, "%D %b %Y" ) AS creationDate, DATE_FORMAT(round.revision_date, "%D %b %Y" ) AS revisionDate, round.is_private, 
       round.image AS roundImage,
       game.name AS gameName, game.image AS gameImage, game.content AS gameContent,
       user.name AS authorName, user.avatar_url AS authorAvatar,
       group.name AS groupName, group.max_players AS groupMaxPlayers
       FROM round
       JOIN game ON game.id = game_id
       JOIN user ON user.id = author_id
       JOIN group ON group.id = group_id
       WHERE round.id=?`,
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the rounds.");
  }
};

module.exports = { getAllRounds, getOneRound };
