const express = require("express");
const  knex = require("knex")(require('../knexfile'));
const { v4 } = require("uuid");
const router = express.Router();
const MD5=require("crypto-js/md5");
const getUser = (username) => users.find((user) => user.username === username);
function user_signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please fill out all the blanks");
  }

  const newuser = {
    username: username,
    password: (MD5(password).toString()),
  };
  knex("user")
    .insert(newuser)
    .then(() => {
      res.sendStatus(201);
    });
}
function user_login(req, res) {
  const { username, password } = req.body;
  // check if the password matches what we have stored
  knex("user")
    .where({ username: username, password: (MD5(password).toString()) })
    .then((result) => {
        console.log(result)
      if (result.length === 0) {
        return res.status(401).json({
          message: `login failed, please check username and password`,
        });
      }
      res.status(200).send(result[0]);
    });
}
router.post("/signup", user_signup);
router.post("/login", user_login);

module.exports = router;
