const { connection, tokenSecret } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  // Password encryption
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  // Insertion in database
  connection.query(
    "INSERT INTO user SET ? AND registration_date = NOW()",
    [req.body],
    (errReq, resReq) => {
      if (errReq) {
        console.log(errReq.sql);
        console.log(errReq.message);
        return res.status(500).send("Error while creating user");
      }

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
    }
  );
};

module.exports = { createUser };
