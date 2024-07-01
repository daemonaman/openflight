const { BuilderManagementModel } = require("../models/builder.model");

const saveBuilder = async (builderData, session) => {
  try {
    const builder = await new BuilderManagementModel(builderData).save(session);
    return builder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveBuilder,
};
