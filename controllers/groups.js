const { connection } = require("../conf");
const getAllGroup = async (req, res) => {
  try {
    let { author_id = "", name = "" } = req.query;
    let sqlRequest =
      "SELECT id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl FROM news";
    if (author) {
      author = `${author_id}%`;
      sqlRequest = "SELECT  FROM group WHERE author LIKE ? OR name LIKE ?";
    }
    if (name) {
      name = `${name}%`;
      sqlRequest = "SELECT  FROM group WHERE author LIKE ? OR name LIKE ?";
    }
    // get all group or searchbar for the group

    const [data] = await connection.query(sqlRequest, [author_id, name]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the news.");
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
    return res.status(500).send("Error while reading the news.");
  }
};

module.exports = { getAllGroup, getOneGroup };
