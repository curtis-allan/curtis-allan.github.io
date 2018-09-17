const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define user collection object
const user = new Schema({
  name: String,
  email: String,
  username: String,
  auth0_id: String
});

// Insert model into database as with product
module.exports = mongoose.model("User", user);
