const { connection } = require("../conf");

const getAllGroups = async (req, res) => {
  try {
    let { author = "", name = "", maxPlayer = "" } = req.query;
    let sqlRequest =
      "SELECT id, name, image, author_id as authorId, creation_date as creationDate, max_players as maxPLayer FROM `group`";
    const sqlRequestQuery =
      "SELECT id, name, image, author_id as authorId, creation_date as creationDate, max_players as maxPLayer FROM `group` WHERE author_id = ? OR name LIKE ? OR max_players <= ?";
    if (author) {
      authorId = `${author}%`;
      sqlRequest = sqlRequestQuery;
    }
    if (name) {
      name = `%${name}%`;
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
      'SELECT group.id as groupId, group.name as name, group.image as groupImage,DATE_FORMAT(group.creation_date, "%W, %d %M %Y" ) as groupCreationDate, group.max_players as GroupMaxPlayers, COUNT(user.id) as numberOfPlayers FROM user_group JOIN `user` ON user.id=user_group.user_id JOIN `group` ON group.id=user_group.group_id WHERE group.id = ?',
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
      "SELECT user.name AS author, user.avatar_url AS authorAvatar FROM user JOIN `group` ON user.id=group.author_id WHERE group.id = ? AND user.id = author_id",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the author og the group.");
  }
};

const createOneGroup = async (req, res) => {
  try {
    const [resReq] = await connection.query("INSERT INTO `group` SET ?", [
      req.body,
    ]);

    const userGroup = {
      user_id: req.body.author_id,
      group_id: resReq.insertId,
    };

    await connection.query("INSERT INTO user_group SET ?", [userGroup]);

    const group = {
      name: req.body.name,
      image: req.body.image,
      max_players: req.body.max_players,
    };

    return res.status(200).send({ group });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while creating the group.");
  }
};

module.exports = { getAllGroups, getOneGroup, getOneAuthor, createOneGroup };
