const crypto = require("crypto");
const OtpModel = require("../models/otp-model");

class OtpService {
  generateOtp = async () => {
    return await crypto.randomInt(100000, 999999);
  };

  storeOtp = async (data) => {
    return await OtpModel.create(data);
  };

  removeOtp = async (userId) => {
    await OtpModel.deleteOne({ userId });
  };

  findOtp = async (userId, otp) => {
    return await OtpModel.findOne({ userId: userId, otp });
  };

  verifyOtp = async (userId, otp) => {
    userId = userId.toString();
    const otpData = await this.findOtp(userId, otp);
    if (!otpData) return false;
    this.removeOtp(userId);
    return true;
  };
}

module.exports = new OtpService();
