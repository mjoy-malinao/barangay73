const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  contact: {
    type: String,
    required: [true, "Please enter a contact"],
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
