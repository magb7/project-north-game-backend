const { connection } = require("../conf");
const getAllGroups = async (req, res) => {
  try {
    let { author = "", name = "", maxPlayer = "" } = req.query;
    let sqlRequest =
      "SELECT group.id, group.name, image, user.name AS authorName, creation_date as creationDate, max_players as maxPlayer FROM `group` JOIN user ON user.id = author_id";
    const sqlRequestQuery =
      "SELECT group.id, group.name, image, user.name AS authorName, creation_date as creationDate, max_players as maxPlayer FROM `group` JOIN user ON user.id = author_id WHERE user.name = ? OR group.name LIKE ? OR max_players <= ?";
    if (author) {
      author = `${author}`;
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
      "SELECT group.id as groupId, group.name as groupName, group.image as groupImage, group.creation_date as groupCreationDate, group.max_players as GroupMaxPlayers, COUNT(user.id) as numberOfPlayers FROM northgame.user_group JOIN northgame.user ON user.id=user_group.user_id JOIN northgame.group ON group.id=user_group.group_id WHERE group.id = ? GROUP BY user.name",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the groups.");
  }
};

module.exports = { getAllGroups, getOneGroup };
