const { connection, tokenSecret } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    // Password encryption
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Insertion in database
    const sqlRequest = `INSERT INTO user (name, mail, password, registration_date) VALUES ('${req.body.name}','${req.body.mail}','${req.body.password}', NOW())`;

    const [resReq] = await connection.query(sqlRequest);

    // Creation of a user to make token
    const user = {
      mail: req.body.mail,
      id: resReq.insertId,
    };

    // Creation of the token
    const token = jwt.sign(user, `${tokenSecret}`);

    // Sending back to the user the token and minor information
    return res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.status(500).send("Error while creating user");
    console.log(err.sql);
    console.log(err.message);
    return;
  }
};

module.exports = { createUser };
