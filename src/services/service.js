const generateAuthToken = require("../middleware/token");
const query = require("../queries/login.query");
const userQuery = require("../queries/user.query");
const builderQuery = require("../queries/builder.query");
const agentQuery = require("../queries/agent.query");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const bcryptPassword = require("../../commons/utils/hash.password");
const sendMail = require("../../commons/utils/nodemailer");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");

const addAdmin = async (body, session) => {
  try {
    if (body.role !== undefined && body.role !== "admin") {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invallid Input.",
        "The role must be admin.",
        null,
        null
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const bodyWithHashedPassword = {
      ...body,
      password: hashedPassword,
      role: "admin",
    };
    return await query.saveAdmin(bodyWithHashedPassword, session);
  } catch (error) {
    throw error;
  }
};
const addUser = async (body, session) => {
  try {
    if (body.role === "admin") {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invallid Input.",
        "Please specify the role as user, builder, or agent.",
        null,
        null
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const bodyWithHashedPassword = {
      ...body,
      password: hashedPassword,
    };
    const register = await query.saveUser(bodyWithHashedPassword, session);
    // if (body.role === "user") {
    //   await userQuery.saveUser(bodyWithHashedPassword, session);
    // }
    await userQuery.saveUser(bodyWithHashedPassword, session);
    if (body.role === "builder") {
      const { name, number, email } = body;
      const builderData = {
        name: name,
        email: email,
      };
      await builderQuery.saveBuilder(builderData, session);
    }
    if(body.role === "agent"){
      const { name, number, email} = body;
      const agentData = {
        name: name,
        email: email,
      };
      await agentQuery.saveAgent(agentData, session);
    }
    return register;
  } catch (error) {
    throw error;
  }
};
const login = async (body) => {
  try {
    const { username, password } = body;
    const user = await query.findByEmail(username);
    let isValidCredentials = false;
    if (user) {
      isValidCredentials = await bcrypt.compare(password, user.password);
    }
    if (!isValidCredentials) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "Invalid Credentials"
      );
    }
    const role = user.role;
    const token = await generateAuthToken.generateAuthToken(username, role);
    if (role === "user") {
      const userDetails = await userQuery.getUserDetails(username);
      return { role: role, token: token, userDetails: userDetails };
    }
    return { role: role, token: token };
  } catch (error) {
    throw error;
  }
};
const updateUser = async (userName, role, body) => {
  try {
    const updatedUser = await userQuery.updateUser(userName, body);
    if (body.name || body.number || body.email) {
      await query.updateUser(userName, body);
    }
    if (role === 'builder') {
      await userQuery.updateBuilder(userName, body);
    }
    if (role === 'agent') {
      await userQuery.updateAgent(userName, body);
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const forgotPassword = async (body) => {
  try {
    let getEmail = body.email
    const getUserDetails = await query.findByEmail(getEmail);
    if (!getUserDetails) {
      throw customException.error(
        statusCode.SUCCESS_CODE,
        null,
        "This email Id is not registered , Please check it again"
      );
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    getUserDetails.resetPasswordToken = resetToken;
    getUserDetails.resetPasswordExpires = Date.now() + (15 * 60 * 1000);
    await getUserDetails.save();
    let subject = "Password Reset";
    let message =
      `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    <a>click this link
    http://localhost:5000/rest/api/password-reset/${resetToken}</a>\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`
    sendMail(getEmail, subject, message)
    return { success: true, message: 'Reset email sent successfully' };
  } catch (error) {
    throw error
  }
}
const userPasswordReset = async (params, body) => {
  try {
    let { token } = params;
    let { password, confirmPassword } = body;
    if (password !== confirmPassword) {
      throw customException.error(
        statusCode.UN_AUTHORIZED,
        null,
        "password and confirm password didn't match!"
      );
    }
    const getuser = await query.updatePassword(token);
    if (!getuser) {
      throw customException.error(
        statusCode.SESSION_EXPIRED,
        null,
        "Session expired or token invalid, please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!"
      );
    }
    if (Date.now() > getuser.resetPasswordExpires) {
      getuser.resetPasswordToken = undefined;
      getuser.resetPasswordExpires = undefined;
      await getuser.save();
    }
    if (getuser) {
      const hashedPassword = await bcryptPassword.encryptPassword(password);
      getuser.password = hashedPassword;
      getuser.resetPasswordToken = undefined;
      getuser.resetPasswordExpires = undefined;
      await getuser.save();
      return { success: true, message: 'Password changed Sucessfully' };

    } else {
      return { success: true, message: 'Your password has been successfully updated. Please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!' };
    }
  } catch (error) {
    throw error
  }
};
module.exports = {
  addAdmin,
  addUser,
  login,
  updateUser,
  forgotPassword,
  userPasswordReset
};
