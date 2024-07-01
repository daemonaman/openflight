const jwt = require('jsonwebtoken');
const generateAuthToken =  (username,role) => {
  try {
    return jwt.sign({ username,role}, process.env.SECRET_KEY);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  generateAuthToken
}