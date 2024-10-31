var moongoose = require("mongoose");
var crypto = require("crypto");
var userSchema = new moongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hash: String,
  salt: String,
});
// now set the password
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};
// now once we set the password, we need to validate the password
userSchema.methods.validPassword = function (password) {
  // for validating the password, we must have the same hash in setting the password and in validating it
  // if the both hashvalues are same then only the password is valid
  var hash = crypto
    .pbkdf2(password, this.salt, 1000, 16, "sha1")
    .toString("hex");
  return this.hash === hash; // valid password
};
module.exports = moongoose.model("User", userSchema);
