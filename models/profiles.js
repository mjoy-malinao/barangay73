const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  position: {
    type: String,
    required: [true, "Please enter a position"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  contact: {
    type: String,
    required: [true, "Please enter a contact"],
  },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
