const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
const accessTokenSecret =
  "f2a2ba188285599579375e269f8aa9ff91d46d42907c93716b64839257daa544f49b85ef17d2d90c159a753117dcaadfd69dbd6b2573e2eb851567039ac95f87";
const refereshTokenSecret =
  "15df2a7a633cc4e19e5d4067a9ac634840199765d8e1fa94a1b37cd84b56928a798542e7c0ad0fb1975e79a6bd79fa34c84b1172df1364b1b85f485d7aa720d0";

class TokenService {
  generateToken = async (payload) => {
    const accessToken = await jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
      
    });

    const refereshToken = await jwt.sign(payload, refereshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refereshToken };
  };

  storeRefereshToken = async (token, userId) => {
    return await TokenModel.create({ token, userId });
  };

  verifyAccessToken = async (accessToken) => {
    return await jwt.verify(accessToken, accessTokenSecret);
  };

  verifyRefereshToken = async (refereshToken) => {
    return await jwt.verify(refereshToken, refereshTokenSecret);
  };

  findRefereshToken = async (userId, token) => {
    return await TokenModel.findOne({ userId, token });
  };

  updateRefereshToken = async (userId, token) => {
    return await TokenModel.updateOne({ userId }, { token });
  };
}

module.exports = new TokenService();


