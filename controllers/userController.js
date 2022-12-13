const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const session = require("express-session");
const { check, validationResult } = require("express-validator");

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alerts = errors.array();
    res.render("signup", { alerts: alerts[0].msg });
  } else {
    let password1 = await bcrypt.hash(req.body.password1, 10);
    let newUSer = {
      ...req.body,
      password1,
    };
    let user = new User(newUSer);
    user
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const loginperson = async (req, res) => {
  let existUser = await User.findOne({ email: req.body.email });
  let userName = existUser.firstName;
  let userEmail = existUser.email;
  req.session.email = userEmail;
  req.session.name = userName;
  console.log(req.session.name);
  console.log(req.session.email);
  if (existUser) {
    let correctPass = bcrypt.compareSync(
      req.body.password1,
      existUser.password1
    );
    if (correctPass) {
      res.redirect("/");
    } else {
      console.log("is not correct");
    }
  } else {
    console.log("user isn't there");
  }
};

const logout = (req, res) => {
  res.clearCookie("connect.sid"); // clean up!
  res.redirect("/login");
};

module.exports = {
  createUser,
  loginperson,
  logout,
};
