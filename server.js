const express = require("express");
const app = express();
const expressSession = require("express-session");
const router = require("./config/router");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
app.use(express.static("public"));

app.use(
  expressSession({ secret: "qwerty", saveUninitialized: false, resave: false })
);

//require for EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
//require mongoose
require("./config/mongoose");

//require router
app.use(router);

app.listen(8008, () => {
  console.log("server started");
});
