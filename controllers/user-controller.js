const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const bcrypt = require("bcrypt");
const asyncMiddleware = require("../middlewares/async-middleware");
const ErrorHandler = require("../utils/error-handler");
const UserDto = require("../dtos/user-dto");
const otpService = require("../services/otp-service");
const mailService = require("../services/mail-service");

class UserController {
  register = async (req, res) => {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    res.json({
      status: true,
      message: "Registration Successfull",
      data: new UserDto(createdUser),
    });
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("All Fields Required", 400)); //bad request
    const user = await userService.findUser({ email });
    if (!user) return next(new ErrorHandler("User Not Found", 404)); //Not found
    const {
      _id,
      name,
      email: dbEmail,
      password: hashPassword,
      userType,
    } = user;
    const isValid = await bcrypt.compare(password, hashPassword);
    if (!isValid)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Password" }); // server understood the request but refuses to authorize
    const { accessToken, refereshToken } = await tokenService.generateToken({
      _id,
      userType,
    });
    await tokenService.storeRefereshToken(refereshToken, _id);
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.cookie("refereshToken", refereshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.json({
      success: true,
      message: "Login Successfull",
      data: {
        data: new UserDto(user),
        accessToken,
        refereshToken,
      },
    });

    // console.log(user);
    // res.json({
    //   success: true,
    //   message:--
    //   data: new UserDto(user),
    // });
  };

  forgot = async (req, res, next) => {
    const { email: requestEmail } = req.body;
    if (!requestEmail) return next(new ErrorHandler("All Fields Required"));
    const {
      _id: userId,
      name,
      email,
    } = await userService.findUser({ email: requestEmail });
    if (!userId) return next(new ErrorHandler("No User Found", 404));
    await otpService.removeOtp(userId);
    const otp = await otpService.generateOtp();
    const data = {
      userId,
      otp,
    };
    await otpService.storeOtp(data);
    await mailService.sendForgotPasswordMail(name, email, otp);
    res.json({ success: true, message: "Otp has been to your Email Address" });
  };

  reset = async (req, res, next) => {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password)
      return next(new ErrorHandler("All Fields Required", 401));
    const user = await userService.findUser({ email });
    if (!user) return next(new ErrorHandler("No User Found", 404));
    const { _id: userId } = user;
    const isValid = await otpService.verifyOtp(userId, otp);
    console.log(isValid);
    if (!isValid) return next(new ErrorHandler("Invalid Otp", 400));
    const result = await userService.resetPassword(userId, password);
    res.json({
      success: true,
      message: "Password has been successfully reset",
    });
  };
}

module.exports = new UserController();
