const mongoose = require("mongoose");
const data = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password:{
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("searchdata", data);
