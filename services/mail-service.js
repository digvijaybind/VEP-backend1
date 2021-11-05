const transporter = require("../configs/mail-config");
const mailTemplate = require("../templates/mail-template");
class MailService {
  sendForgotPasswordMail = async (name, email, otp) => {
    const { subject, text } = mailTemplate.forgotPassword(name, otp);
    await this.sendMail(email, subject, text);
  };

  sendMail = async (to, subject, text) => {
    const mailOptions = {
      from: "Digvijay Bind",
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      console.log(err);
      console.log(info);
    });
  };
}

module.exports = new MailService();
