/**
 * Reference:
 * https://medium.com/ms-club-of-sliit/jwt-bearer-token-authentication-for-express-js-5e95bf4dead0
 */
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
// const Role = db.role;
const Role = require('../models/role.model');
const User = require('../models/user.model');
verifyToken = (req, res, next) => {
  console.log(req.headers);

  const bearerHeader = req.headers['authorization'];
  console.log('bearerHeader');
  console.log(bearerHeader);
  let bearerToken;
  if(bearerHeader){
    const bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];
    console.log(bearerToken);
    
  }
  let token = bearerToken;
  //To read from x-access-token
  // let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
