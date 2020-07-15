const { connection } = require("../conf");
const getAllGroup = async (req, res) => {
  try {
    let { authorId = "", name = "" } = req.query;
    let sqlRequest =
      "SELECT id, name, image, author_id AS authorId, creation_date AS creationDate, max_player AS maxPLayer FROM group";
    if (authorId) {
      authorId = `${author_id}%`;
      sqlRequest =
        "SELECT id, name, image, author_id AS authorId, creation_date AS creationDate, max_player AS maxPLayer FROM group WHERE author LIKE ? OR name LIKE ?";
    }
    if (name) {
      name = `${name}%`;
      sqlRequest =
        "SELECT id, name, image, author_id AS authorId, creation_date AS creationDate, max_player AS maxPLayer FROM group WHERE author LIKE ? OR name LIKE ?";
    }
    // get all group or searchbar for the group

    const [data] = await connection.query(sqlRequest, [authorId, name]);
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
    const [data] = await connection.query("SELECT  FROM group WHERE id = ?", [
      id,
    ]);

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the groups.");
  }
};

module.exports = { getAllGroup, getOneGroup };
