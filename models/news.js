const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  filename: {
    type: String,
    unique: true,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  imageBase64: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  hashtag: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("news", newsSchema);

module.exports = News;
