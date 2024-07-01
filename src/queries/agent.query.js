const {AgentManagementModel} =require("../models/agent.model");

const saveAgent = async (agentData, session) => {
    try{
  const agent = await new AgentManagementModel(agentData).save(session);
  return AgentManagementModel;
    } catch (error) {
        throw error;

    }
}; 
 module.exports = {
    saveAgent
 }