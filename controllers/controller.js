const { question } = require("../models/question");
const { User } = require("../models/user");
const commentModel = require("../models/comment");
const comment = require("../models/comment");

const getHomepage = (req, res) => {
  let cookies = req.header("cookie");
  question
    .find()
    .then((result) =>
      res.render("index", { result, cookies, name: req.session.name })
    )
    .catch((err) => console.log(err));
};

const postNewQuestion = async (req, res) => {
  if (req.method === "GET") {
    res.render("index");
  }

  if (req.method === "POST") {
    let users = await User.findOne({ email: req.session.email });
    let userId = users._id;
    const questions = new question(req.body);
    questions.author = userId;
    questions
      .save()
      .then((result) => res.redirect("/"))
      .catch((err) => console.log(err));
  }
};

const showOneQuestion = (req, res) => {
  question
    .findById({ _id: req.params.id })
    .populate("comments")
    .then((result) => res.render("showOne", { result, name: req.session.name }))
    .catch((err) => console.log(err));
};

const addComment = async (req, res) => {
  let userId = await User.findOne({ email: req.session.email });
  let newComment = new commentModel(req.body);
  newComment.author = userId._id;
  newComment.questionId = req.params.id;
  newComment
    .save()
    .then((comment) => {
      question
        .findById(req.params.id)
        .then((qesut) => {
          qesut.comments.push(comment);
          qesut.save();
          res.redirect(`/question/${req.params.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOneQuestion = (req, res) => {
  if (req.method === "GET") {
    question
      .findById({ _id: req.params.id })
      .then((result) =>
        res.render("editQuestion", { result, name: req.session.name })
      )
      .catch((err) => console.log(err));
  }
  if (req.method === "POST") {
    question
      .findByIdAndUpdate({ _id: req.params.id })
      .then((result) => {
        result.title = req.body.title;
        result.message = req.body.message;
        result
          .save()
          .then(() => res.redirect(`/question/${req.params.id}`))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
};

const deleteOneQuestion = (req, res) => {
  question
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};
const deleteComment = (req, res) => {
  comment
    .findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
};

const login_page = (req, res) => {
  res.render("login");
};

const signup_page = (req, res) => {
  res.render("signup", { alerts: null });
};

module.exports = {
  getHomepage,
  postNewQuestion,
  showOneQuestion,
  updateOneQuestion,
  deleteOneQuestion,
  login_page,
  signup_page,
  addComment,
  deleteComment,
};
