const express = require("express");
const  knex = require("knex")(require('../knexfile'));
const { v4 } = require("uuid");
const router = express.Router();
const MD5=require("crypto-js/md5");
const jwt=require("jsonwebtoken");
const jwt_decode=require("jwt-decode");
function gethelper(req,res){
  knex("helper")
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((error) => {
    res.status(400).send(`error on retrieve helper ${error}`);
  });
}

// function helper_signup(req, res) {
//   const { helperusername, password, helperregion, helpercontact } = req.body;
//   if (!helperusername || !password || !helperregion || !helpercontact) {
//     return res.status(400).send("Please fill out all the blanks");
//   }
//   const newhelper = {
//     helperusername: helperusername,
//     password: (MD5(password).toString()),
//     helperregion: helperregion,
//     helpercontact: helpercontact,
//   };
//   knex("helper")
//     .insert(newhelper)
//     .then(() => {
//       res.sendStatus(201);
//     });
// }
// function helper_login(req, res) {
//   const { helperusername, password} = req.body;
//   // check if the password matches what we have stored
//   knex("helper")
//     .where({ helperusername: helperusername, password: (MD5(password).toString()) })
//     .then((result) => {
//         console.log(result)
//       if (result.length === 0) {
//         return res.status(401).json({
//           message: `login failed, please check username and password`,
//         });
//       }
//       else{
//       const token = jwt.sign(
//         {
//           helperusername: helperusername,
//           password: password,
//         },
//         process.env.SECRET_KEY
//       );
//       res.send(token);
//       }
//     });
// }
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

        req.helper = decoded;

    next();
      }
    });
  },
  (req,res)=>{
    const{helperusername}=req.helper
    console.log(req.helper)
    console.log(helperusername)
    knex("helper")
    .where({ helperusername:helperusername }) 
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

        req.helper = decoded;

    next();
      }
    });
  },
    (req,res)=>{
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
    .then((result) => {
      if(result.length===0){
        return("cannot update the user")
      }
      else{
      const token = jwt.sign(
        {
          helperusername: helperusername,
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

router.get("/",gethelper)


module.exports = router