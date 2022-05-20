// const db = require("../models");
const Role = require('../models/role.model');
const User = require('../models/user.model');
//const ROLES = db.ROLES;
//const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};
checkRolesExisted = (req, res, next) => {
  console.log(req.body.roles)

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {

      // if (!Role.includes(req.body.roles[i])) {
      //   res.status(400).send({
      //     message: `Failed! Role ${req.body.roles[i]} does not exist!`
      //   });
      //   return;
      // }

      Role.find({name:req.body.roles[i]}, function(err, doc){
        if(err){
              res.status(400).send({
              message: `Failed! Error Role ${req.body.roles[i]} does not exist!`
            });
            return;
          }
          if(!doc){
            res.status(400).send({
            message: `Failed! Doc Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
        });
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;
