const { connection } = require("../conf");
const express = require("express");

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  try {
    // get info of one user
    const [
      data,
    ] = await connection.query(
      "SELECT name, avatar_url as avatar FROM user WHERE id = ?",
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
};

module.exports = { getUserInfo };
