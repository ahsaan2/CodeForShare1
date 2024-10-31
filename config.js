"use strict"; // is a way to enable strict mode, which helps you to write cleaner and more error-free code
// configuration of the account, and then tell the nodemailer to send the email(done in route)
module.exports = {
  // is a special object in Node.js that is used to define what a module exports, for use in other files.
  // in Node.js every file is treater as a module, and by using module.exports, you can specify which part
  // of your code should be accessible to other modules.
  mailer: {
    service: "Gmail",
    auth: {
      user: "loneahsaan135@gmail.com",
      pass: "afpixhqgyzsoyljl",
    },
    dbconnstring: 'mongodb://127.0.0.1:27017/codeshare'
  },
};
// from this email address the messages are sent

