const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", controller.getHomepage);

router.all("/add-question", controller.postNewQuestion);
router.get("/question/:id", auth.loggedIn, controller.showOneQuestion);
router.all("/question/edit/:id", controller.updateOneQuestion);
router.get("/question/delete/:id", controller.deleteOneQuestion);
router.get("/login", auth.isLoggedIn, controller.login_page);
router.get("/signup", auth.isLoggedIn, controller.signup_page);

router.post(
  "/signupUser",
  urlencodedParser,
  [
    check("email", "").isEmail().normalizeEmail(),
    check("password1", "At least 6 charachter").isLength({ min: 6 }),
    check("password2", "At least 6 charachter").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

router.post("/loginUser", userController.loginperson);
router.get("/logout", userController.logout);

router.post("/add/:id/comment", controller.addComment);
router.post("/delete/:id/comment", controller.deleteComment);

module.exports = router;
