const { connection } = require("../conf");
const getAllGroups = async (req, res) => {
  try {
    let { authorId = "", name = "", maxPlayer = "" } = req.query;
    let sqlRequest =
      "SELECT group.id, group.name, image, user.name AS authorName, creation_date as creationDate, max_players as maxPLayer FROM northgame.group JOIN user ON user.id = author_id";
    const sqlRequestQuery =
      "SELECT group.id, group.name, image, user.name AS authorName, creation_date as creationDate, max_players as maxPLayer FROM northgame.group JOIN user ON user.id = author_id WHERE author_id = ? OR name LIKE ? OR max_players <= ?";
    if (authorId) {
      authorId = `${authorId}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (name) {
      name = `${name}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (maxPlayer) {
      sqlRequest = sqlRequestQuery;
    }

    // get all group or searchbar for the group

    const [data] = await connection.query(sqlRequest, [
      authorId,
      name,
      maxPlayer,
    ]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the groups.");
  }
};

const getOneGroup = async (req, res) => {
  const { id } = req.params;
  try {
    // get one group
    const [
      data,
    ] = await connection.query(
      "SELECT group.id, group.name, image, user.name AS authorName, creation_date as creationDate, max_players as maxPLayer FROM northgame.group JOIN user ON user.id = author_id WHERE group_id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the groups.");
  }
};

module.exports = { getAllGroups, getOneGroup };
