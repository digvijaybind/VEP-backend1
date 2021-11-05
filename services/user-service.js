const UserModel = require("../models/user-model");

class UserService {
  createUser = async (user) => {
    return await UserModel.create(user);
  };

  findUser = async (filter) => {
    return await UserModel.findOne(filter);
  };

  resetPassword = async (_id, password) => {
    const res = await UserModel.updateOne({ _id }, { password });
  };
}

module.exports = new UserService();
