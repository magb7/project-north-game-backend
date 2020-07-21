const { connection } = require("../conf");
const getAllGroups = async (req, res) => {
  try {
    let { author = "", name = "", maxPlayer = "" } = req.query;
    let sqlRequest =
      "SELECT id, name, image, author_id as authorId, creation_date as creationDate, max_players as maxPLayer FROM `group`";
    const sqlRequestQuery =
      "SELECT id, name, image, author_id as authorId, creation_date as creationDate, max_players as maxPLayer FROM `group` WHERE author_id = ? OR name LIKE ? OR max_players <= ?";
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
      author,
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
      "SELECT group.id as groupId, group.image as groupImage, group.creation_date as groupCreationDate, group.max_players as GroupMaxPlayers, COUNT(user.id) as numberOfPlayers FROM northgame.user_group JOIN northgame.user ON user.id=user_group.user_id JOIN northgame.group ON group.id=user_group.group_id WHERE group.id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the groups.");
  }
};

const getOneAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    // get one group
    const [
      data,
    ] = await connection.query(
      "SELECT user.name AS author FROM northgame.user JOIN northgame.group ON user.id=group.author_id WHERE group.id = ? AND user.id = author_id",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the author og the group.");
  }
};

module.exports = { getAllGroups, getOneGroup, getOneAuthor };
