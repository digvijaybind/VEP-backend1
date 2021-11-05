const tokenService = require("../services/token-service");
const ErrorHandler = require("../utils/error-handler");
const { TokenExpiredError } = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const {
    accessToken: accessTokenFromCookie,
    refereshToken: refereshTokenFromCookie,
  } = req.cookies;

//   const accessTokenFromCookie =req.cookies.accessToken;
//   const refereshTokenFromCookie =req.cookies.refereshToken;
  try {
    if (!accessTokenFromCookie)
      return next(new ErrorHandler("Missing Access Token", 401));//Unauthorized Error or lack of credentials
    const userData = await tokenService.verifyAccessToken(
      accessTokenFromCookie
    );
    if (!userData)
      throw new Error(new ErrorHandler("Unauthorized Access", 401));//unauthorized or lack of valid credentials
    req.user = userData;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      if (!refereshTokenFromCookie)
        return next(
          new ErrorHandler(
            "Access Token Expired, No Referesh Token Provided To Generate The Access Token Again",
            401
          )//unauthorized client request or lacks valid authentication credentials
        );
      const userData = await tokenService.verifyRefereshToken(
        refereshTokenFromCookie
      );
      const token = await tokenService.findRefereshToken(
        userData._id,
        refereshTokenFromCookie
      );
      if (!token)
        return next(
          new ErrorHandler(
            "Access Token Expired, Referesh Token Is Also Not Valid",
            401
          )
        );//unauthorized or lack of valid credentials
      const payload = {
        _id: userData._id,
        userType: userData.userType,
      };
      const { accessToken, refereshToken } = await tokenService.generateToken(
        payload
      );
      await tokenService.updateRefereshToken(userData._id, refereshToken);
      req.user = userData;
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 *30,
      });
      res.cookie("refereshToken", refereshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return next();
    } else return next(new ErrorHandler("Unauthorized Access", 401));
  }
  next();
};

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.userType != role) {
      return next(new ErrorHandler("Not Allowed", 403));//server understands the request but refuses to authorize it.
    }
    next();
  };
};

module.exports = {
  auth,
  authRole,
};
