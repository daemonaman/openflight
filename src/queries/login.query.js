const { UserModel } = require("../models/login.model");
const saveAdmin = async(body, session)=>{
    try {
        return await new UserModel(body).save(session);
    } catch (error) {
        throw error;
    }
}
const saveUser = async (body, session) => {
  try {
    return await new UserModel(body).save(session);
  } catch (error) {
    throw error;
  }
};
const findByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email: email });
  } catch (error) {
    throw error;
  }
};
const updateUser = async (userName, body) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: userName },
      body,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const updatePassword = async (resetPasswordToken) => {
  try {
      return await UserModel.findOne({ resetPasswordToken: resetPasswordToken })
  } catch (error) {
      throw error
  }
};

module.exports = {
  saveAdmin,
  saveUser,
  findByEmail,
  updateUser,
  updatePassword,
};
