const { ProfileModel } = require("../models/user.model");
const {BuilderManagementModel}=require("../models/builder.model");
const { AgentManagementModel } = require("../models/agent.model");

const saveUser = async (body, session) => {
  try {
    return await new ProfileModel(body).save(session);
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (userName) => {
  try {
    return await ProfileModel.findOne({ email: userName });
  } catch (error) {
    throw error;
  }
};
const updateUser = async (userName, body) => {
  try {
    const updatedUser = await ProfileModel.findOneAndUpdate(
      { email: userName },
      body,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};
const updateBuilder = async(userName, body)=>{
  try {
    const updatedBuilder = await BuilderManagementModel.findOneAndUpdate({email:userName}, body, {new:true});
    return updatedBuilder;
  } catch (error) {
    throw error;
  }
}
const updateAgent = async(userName, body)=>{
  try {
    const updatedAgent = await AgentManagementModel.findOneAndUpdate({email:userName}, body, {new:true});
    return updatedAgent;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  saveUser,
  getUserDetails,
  updateUser,
  updateBuilder,
  updateAgent
};
