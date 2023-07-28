const express = require("express");
const  knex = require("knex")(require('../knexfile'));
const { v4 } = require("uuid");
const router = express.Router();
const MD5=require("crypto-js/md5");
const getUser = (username) => users.find((user) => user.username === username);
function helper_signup(req, res) {
  const { helperusername, password, helperregion, helpercontact } = req.body;
  if (!helperusername || !password || !helperregion || helpercontact) {
    return res.status(400).send("Please fill out all the blanks");
  }
  const newhelper = {
    helperusername: helperusername,
    password: password,
    helperregion: helperregion,
    helpercontact: helpercontact,
  };
  knex("helper")
    .insert(newhelper)
    .then(() => {
      res.sendStatus(201);
    });
}
function helper_login(req, res) {
  const { helperusername, password } = req.body;
  // check if the password matches what we have stored
  const helper = getUser(helperusername);

  if (helper && helper.password === password) {
    // if it matches, create and issue a token
    const token = jwt.sign(
      {
        username: helper.username,
        name: helper.name,
      },
      process.env.SECRET_KEY
    );
    res.send(token);
  } else {
    // if not, send error status code
    res.sendStatus(401);
  }
}
function helper_delete(req, res) {
  knex("helper")
    .where({ helperusername: req.body.helperusername }) 
    .del()
    .then(() => {
     
      res.status(204).send("delete failed");
    })
 
}
function helper_edit(req, res) {
  const {
    helperusername,
    password,
    helperregion,
    helpercontact,
  } = req.body;

  if (!helperusername || !password || !helperregion || !helpercontact) {
    return res.status(400).send("Please fill out all the blank");
  }

  const edithelper= {
    helperusername:helperusername,
    password:password,
    helperregion:helperregion,
    helpercontact:helpercontact
  };

  knex("helper")
    .where({helperusername:helperusername})
    .update(edithelper)
    .then(() => {
      res.status(200).send("updated");
    })
    .catch(() => {
      res.status(500).json({
        message: ` unable to updated your information`,
      });
    });
}
router.post("/signup",helper_signup)
router.post("/login",helper_login)
router.patch("/edit",helper_edit)
router.delete("/delete",helper_delete)

module.exports = router