const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Products need: id, name, description, price
const product = new Schema({
  name: String,
  description: String,
  price: Number
});

// Model made with product object and sent to mongoDB
module.exports = mongoose.model("Product", product);
