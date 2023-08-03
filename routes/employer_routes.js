const express = require("express");
const  knex = require("knex")(require('../knexfile'));
const { v4 } = require("uuid");
const router = express.Router();
const MD5=require("crypto-js/md5");
const jwt=require("jsonwebtoken");
const jwt_decode=require("jwt-decode");
function getcompany(req,res){

    knex("employer")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).send(`error on retrieve employer information ${error}`);
    });
  
}
function company_signup(req, res) {
  const { username, password, companylocation, companycontact ,companydescription,companyname} = req.body;
  if (!username || !password || !companylocation || !companycontact||!companydescription||!companyname) {
    return res.status(400).send("Please fill out all the blanks");
  }
  const newcompany = {
    username: username,
    password: (MD5(password).toString()),
    companylocation:companylocation,
    companydescription:companydescription,
    companyname:companyname,
    companycontact:companycontact
  };
  knex("company")
    .insert(newcompany)
    .then(() => {
      res.sendStatus(201);
    });
}
function company_login(req, res) {
  const {username, password} = req.body;
  // check if the password matches what we have stored
  knex("company")
    .where({ username: username, password: (MD5(password).toString()) })
    .then((result) => {
        console.log(result)
      if (result.length === 0) {
        return res.status(401).json({
          message: `login failed, please check username and password`,
        });
      }
      else{
      const token = jwt.sign(
        {
          companyusername: username,
          password: password,
        },
        process.env.SECRET_KEY
      );
      res.send(token);
      }
    });
}
router.delete("/delete",(req, res,next)=> {
  const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const token = authorization.slice("Bearer ".length);

    console.log(token);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      // if not, send a response
      if (err) {
        return res.sendStatus(401);
      } else {
        // if they're authorised, call next()
        console.log(decoded);

        req.company = decoded;

    next();
      }
    });
  },
  (req,res)=>{
    const{companyusername}=req.company
    console.log(req.company)
    console.log(companyusername)
    knex("company")
    .where({ companyusername:companyusername }) 
    .del()
    .then(() => {
     
      res.status(204).send("deleted");
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: `unable to delete`,
      });
    });}
)
router.patch("/edit",(req, res,next)=>{
  const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const token = authorization.slice("Bearer ".length);

    console.log('tok',token);


    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      // if not, send a response
      if (err) {
        return res.sendStatus(401);
      } else {
        // if they're authorised, call next()
        console.log('decoded',decoded);

        req.company = decoded;

    next();
      }
    });
  },
    (req,res)=>{
  const {
    companyusername,
    password,
    companyregion,
    companycontact,
  } = req.body;

  if (!companyusername || !password || !companyregion || !companycontact) {
    return res.status(400).send("Please fill out all the blank");
  }

  const editcompany= {
    companyusername:companyusername,
    password:password,
    companyregion:companyregion,
    companycontact:companycontact
  };

  knex("company")
    .where({companyusername:companyusername})
    .update(editcompany)
    .then((result) => {
      if(result.length===0){
        return("cannot update the user")
      }
      else{
      const token = jwt.sign(
        {
          companyusername: companyusername,
          password: password,
        },
        process.env.SECRET_KEY
      );
      // res.send(token);
      res.status(200).send(token);}
    })
   
   
    .catch(() => {
      res.status(500).json({
        message: ` unable to updated your information`,
      });
    });
}
)
router.post("/signup",company_signup);
router.post("/login",company_login);
router.get("/",getcompany);


module.exports = router