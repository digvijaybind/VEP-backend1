const nodeMailer = require("nodemailer");

transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  requireTLS: true,
  auth: {
    user: "wishbefore@gmail.com",
    pass: "securityissue",
  },
});

module.exports = transporter;
