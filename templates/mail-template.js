const websiteName = process.env.WEBSITE_NAME || 'Website Name';

class MailTemplate{

    forgotPassword = (name,otp) =>
    {
        const subject = `Recover your ${websiteName} password`;
        const text = `Dear ${name},\n You told us you forgot your password, If you really did, Use this OTP (One Time Password) to choose a new one. \n\n ${otp} \n\n If you didn't make this request, you can safely ignore this email :)`;
        return {subject,text};
    }

}

module.exports = new MailTemplate();