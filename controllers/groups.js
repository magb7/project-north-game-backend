const { connection } = require("../conf");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const getAllGroups = async (req, res) => {
  try {
    let { authorId = "", name = "", maxPlayer = "" } = req.query;
    let sqlRequest =
      "SELECT group.id AS groupId, group.name AS groupName, group.creation_date as creationDate, group.image AS groupImage , group.max_players AS maxPlayers, user.name as AuthorName FROM northgame.group JOIN northgame.user ON user.id=group.author_id  ";
    const sqlRequestQuery =
      "SELECT group.id AS groupId, group.name AS groupName, group.creation_date as creationDate, group.image AS groupImage , group.max_players AS maxPlayers, user.name as AuthorName FROM northgame.group JOIN northgame.user ON user.id=group.author_id WHERE author_id = ? OR name LIKE ? OR max_players <= ?";
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
      "SELECT group.id as groupId, group.name as groupName, group.image as groupImage, user.name as groupAuthor, group.creation_date as groupCreationDate, group.max_players as GroupMaxPlayers, COUNT(user.id) as numberOfPlayers FROM northgame.user_group JOIN northgame.user ON user.id=user_group.user_id JOIN northgame.group ON group.id=user_group.group_id WHERE group_id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the groups.");
  }
};

// -------------------- Auth wall
router.use((req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, msg) => {
    if (err) {
      console.log("----");
      console.log(err);
      return res.status(500).send(err);
    }
    if (!user) {
      console.log("----");
      console.log("No user found");
      return res.sendStatus(500);
    }
    next();
  })(req, res);
});
// -------------------- / Auth wall

const postGroup = async (req, res) => {
  const formdata = req.body;
  //post one group
  try {
    await connection.query("INSERT INTO northgame.group SET ?", formdata);

    const group = {
      name: req.body.name,
      author: req.body.author_id,
      maxPLayer: req.body.max_players,
      creationDate: req.body.creation_date,
      image: req.body.image,
    };
    return res.status(200).send({ group });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while adding the group.");
  }
};

module.exports = { getAllGroups, getOneGroup, postGroup };
