const { connection, tokenSecret } = require("../conf");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passeport-stategies");

const createUser = async (req, res) => {
  try {
    // Password encryption
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Insertion in database
    const [resReq] = await connection.query("INSERT INTO `user` SET ?", [
      req.body,
    ]);

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
    console.log(err);
    return;
  }
};

const checkUser = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      console.log("----");
      console.log(err);
      return res.sendStatus(500);
    }
    if (!user) {
      console.log("----");
      console.log("No user found");
      return res.sendStatus(500);
    }
    const token = jwt.sign(user, `${tokenSecret}`);
    return res.status(200).send({
      user,
      token,
    });
  })(req, res);
};

module.exports = { createUser, checkUser };
