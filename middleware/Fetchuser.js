// // const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'Vishalisagood$boy';

// const Fetchuser = (req, res, next) =>{

//     const token = req.header('auth-token')
//     if(!token){
//         res.status(401).send({error: "please enter valid token"})
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET)
//         req.user = data.user;
//         next()
//     } catch (error) {
//         return res.status(401).send({error: "please enter valid token"})
//     }
// }

// module.exports = Fetchuser;

// Fetchuser.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Vishalisagood$boy";

const Fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to req object
  var token = req.header("Authorization");
  // console.log(  req.header)

  // console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ error: "No token provided, access denied" });
  }

  try {
    token = token.split(" ")[1];
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Invalid token, access denied" });
  }
};

module.exports = Fetchuser;
