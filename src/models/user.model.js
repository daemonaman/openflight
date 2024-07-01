const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  address: {
    type: String,
    default: "Unknown",
  },
  createdAt: {
    type: Date,
    default: () => {
        const istDate = getIST();
        istDate.setUTCHours(0, 0, 0, 0);
        return istDate;
      },
  },
  profile: {
    type: String,
    default: null,
  },
});
const getIST = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    istDate.setUTCHours(0, 0, 0, 0);
    return istDate;
  };
const ProfileModel = mongoose.model("UserDetails", userSchema);

module.exports = { ProfileModel };
