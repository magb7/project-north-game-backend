const { connection } = require("../conf");

const getAllGames = async (req, res) => {
  try {
    let { author = "", title = "" } = req.query;
    let sqlRequest =
      "SELECT id, name, banner, thumbnail, description, author, editor, illustrator, themes, nb_players, time FROM game";
    const sqlRequestQuery =
      "SELECT id, name, banner, thumbnail, description, author, editor, illustrator, themes, nb_players, time WHERE author = ? OR name LIKE ?";
    if (author) {
      authorId = `${author}`;
      sqlRequest = sqlRequestQuery;
    }
    if (title) {
      title = `${title}%`;
      sqlRequest = sqlRequestQuery;
    }
    // get all games or searchbar for the game

    const [data] = await connection.query(sqlRequest, [author, title]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the games.");
  }
};

const getOneGame = async (req, res) => {
  const { id } = req.params;
  try {
    // get one event
    const [
      data,
    ] = await connection.query(
      "SELECT id, name, banner, thumbnail, description, author, editor, illustrator, themes, nb_players, time FROM game WHERE id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the game.");
  }
};

module.exports = { getAllGames, getOneGame };
