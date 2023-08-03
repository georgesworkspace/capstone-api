const express = require("express");
const knex = require("knex")(require("../knexfile"));
const { v4 } = require("uuid");
const router = express.Router();
const jwt = require("jsonwebtoken");
const MD5 = require("crypto-js/md5");

function user_signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Please fill out all the blanks");
  }

  const newuser = {
    username: username,
    password: MD5(password).toString(),
    // an immigrant
    user_type_id: 1,
  };
  knex("user")
    .insert(newuser)
    .then(() => {
      res.sendStatus(201);
    });
}

function user_signup_helper(req, res) {
  const { username, password, helpercontact, helperregion } = req.body;
  if (!username || !password || !helpercontact || !helperregion) {
    return res.status(400).send("Please fill out all the blanks");
  }

  const newuser = {
    username: username,
    password: MD5(password).toString(),
    // a employer
    user_type_id: 2,
  };
  knex("user")
    .insert(newuser)
    .then((userIds) => {
      const user_id = userIds[0];
      console.log(user_id);

      const newhelper = {
        user_id,
        helpercontact,
        helperregion,
      };

      knex("helper")
        .insert(newhelper)
        .then(() => {
          res.sendStatus(201);
        });
    });
}
function user_signup_employer(req, res) {
  const {
    username,
    password,
    companycontact,
    companylocation,
    companydescription,
    companyname,
  } = req.body;
  if (
    !username ||
    !password ||
    !companycontact||
    !companydescription ||
    !companylocation ||
    !companyname
  ) {
    return res.status(400).send("Please fill out all the blanks");
  }

  const newuser = {
    username: username,
    password: MD5(password).toString(),
    // a employer
    user_type_id: 3,
  };
  knex("user")
    .insert(newuser)
    .then((userIds) => {
      const user_id = userIds[0];
      console.log(user_id);

      const newemployer = {
        user_id,
        companycontact,
        companylocation,
        companyname,
        companydescription,
      };

      knex("employer")
        .insert(newemployer)
        .then(() => {
          res.sendStatus(201);
        });
    });
}
function user_login(req, res) {
  const { username, password } = req.body;
  // check if the password matches what we have stored
  knex("user")
    .where({ username: username, password: MD5(password).toString() })
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        return res.status(401).json({
          message: `login failed, please check username and password`,
        });
      } else {
        const user = result[0];

        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.SECRET_KEY
        );

        // if user_type_id is 2 .. employer... go get employer info

        if (user.user_type_id === 2) {
          knex("helper")
            .where({ user_id: user.id })
            .first()
            .then((helper) => {
              user.helper = helper;
              return res.json({ token, user });
            });
        } else if (user.user_type_id === 3) {
          knex("employer")
            .where({ user_id: user.id })
            .first()
            .then((employer) => {
              user.employer = employer;
              return res.json({ token, user });
            });
        } else {
          res.json({ token, user });
        }
      }
    });
}

router.get("/", verifyToken, (req, res) => {
  knex("user")
    .where({ id: req.user.id })
    .first()
    .then((user) => {
      console.log(user);
      res.json(user);
    });
});

router.post("/signup", user_signup);
router.post("/signuphelper", user_signup_helper);
router.post("/login", user_login);
router.post("/signupemployer", user_signup_employer);
router.get(
  "/helper",
  // middleware function
  verifyToken,

  // route handler
  (req, res) => {
    // res.json(req.user);
    knex("user")
      .where({ id: req.user.id })
      .first()
      .then((user) => {
        // if user type is 2.. add helper

        if (user.user_type_id === 2) {
          knex("helper")
            .where({ user_id: user.id })
            .first()
            .then((helper) => {
              user.helper = helper;
              return res.json(user);
            });
        }
        if (user.user_type_id === 3) {
          knex("employer")
            .where({ user_id: user.id })
            .first()
            .then((employer) => {
              user.employer = employer;
              return res.json(user);
            });
        } else {
          res.json(user);
        }
      });
  }
);

function verifyToken(req, res, next) {
  // check if the user is authorised

  // get the token that they sent
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.slice("Bearer ".length);

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // if not, send a response
    if (err) {
      return res.sendStatus(401);
    } else {
      // if they're authorised, call next()
      console.log(decoded);

      req.user = decoded;

      next();
    }
  });
}

module.exports = router;
