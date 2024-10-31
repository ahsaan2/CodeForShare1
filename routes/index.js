var express = require("express");
const { emit } = require("../app");
var router = express.Router();
// const {check, validationResult} = require('express-validator')
var nodeMailer = require("nodemailer");
var config = require("../config"); // jump out of the routes folder and get the config
// transport the config mailer to the transporter that we have created in the config hbs
var transporter = nodeMailer.createTransport(config.mailer);

/* GET home page. */
router.get("/", function (req, res, next) {
  // next-> a fuction when called will pass control to the next middleware function in the stack
  res.render("index", { title: "A platform for sharing code" });
  // this line renders a view template called index, the second argument is an object that contains data to be passed to the template
  //
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: "CodeShare -A platform for sharing code." });
});
// since here we are creating a form, so apart from the get method we will have to create a post api also
// for this we use router.route--> this allows us to define multiple HTTP methods for a single request.
router
  .route("/contact")
  .get(function (req, res, next) {
    res.render("contact", { title: "Code4Share- A platform for sharing code" });
  })
  .post(function (req, res, next) {
    // we will here first take the  data before rendering it to the thankYou page
    //checkBody is a function that allows you to validate and sanitize the body of the incoming HTTP requests
    // it takes 2 parameters field and message, field is the body that you want to validate, and message will be returned
    // if the validation fails
    req.checkBody("name", "Empty name").notEmpty();
    req.checkBody("email", "Invalid Email").isEmail();
    req.checkBody("message", "Empty message").notEmpty();
    var errors = req.validationErrors();
    // now check for errors if any
    if (errors) {
      // then send the following response
      res.render("contact", {
        title: "Code4Share- A platform for sharing code",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors,
      });
    } else {
      var mailOPtions = {
        from: "code4Share <noreply@code4share.com>",
        to: "ahsaanul21@gmail.com",
        subject: "You go a new message from visitor",
        text: req.body.message,
      };
      // this functions sends mail to the specified mail-option and the callback functions handles errors and renders the thank-you page
      transporter.sendMail(mailOPtions, function (error, info) {
        if (error) {
          console.log(error);
        }
        res.render("thank", {
          title: "Code4Share - A platform for sharing code",
        });
      });
    }
  }); // render here takes us given hbs page data
// register and login
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login your account" });
});
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register a new account" });
});

module.exports = router;
