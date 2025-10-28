const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  averagePreparationTime: Number,
  category: String,
  stock: Number,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
