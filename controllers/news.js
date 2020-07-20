const { connection } = require("../conf");
const express = require("express");

const getAllNews = async (req, res) => {
  try {
    let { author = "", title = "" } = req.query;
    let sqlRequest =
      "SELECT news.id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl, creation_date AS creationDate, is_published, user.name AS authorName FROM news JOIN user ON user.id = author_id";
    if (author) {
      author = `${author}`;
      sqlRequest =
        "SELECT news.id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl, creation_date AS creationDate, is_published, user.name AS authorName FROM news JOIN user ON user.id = author_id WHERE user.name = ? OR title LIKE ?";
    }
    if (title) {
      title = `${title}%`;
      sqlRequest =
        "SELECT news.id, title, SUBSTR(content, 1, 100) as contenText, picture_url as pictureUrl, creation_date AS creationDate, is_published, user.name AS authorName FROM news JOIN user ON user.id = author_id WHERE user.name = ? OR title LIKE ?";
    }
    // get all news or searchbar for the news

    const [data] = await connection.query(sqlRequest, [author, title]);
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);

    return res.status(500).send("Error while reading the news.");
  }
};
const getOneNews = async (req, res) => {
  const { id } = req.params;
  try {
    // get one news
    const [
      data,
    ] = await connection.query(
      'SELECT news.id, DATE_FORMAT(creation_date, "%D %b %Y" ) as creationDate, release_date as releaseDate, revision_date as revisionDate, is_published as isPublished, user.name AS author, title, content, picture_url as pictureUrl FROM news JOIN user ON user.id= author_id WHERE news.id = ?',
      [id]
    );

    return res.status(200).send(data[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the news.");
  }
};

const postNews = async (req, res) => {
  const formdata = req.body;
  //post one news
  try {
    await connection.query("INSERT INTO news SET ?", formdata);

    const news = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      creationDate: req.body.creation_date,
      pictureUrl: req.body.picture_url,
    };
    return res.status(200).send({ news });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while reading the news.");
  }
};

module.exports = { getAllNews, getOneNews, postNews };
