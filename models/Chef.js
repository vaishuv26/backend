const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: String,
  ordersAssigned: { type: Number, default: 0 },
});

module.exports = mongoose.model('Chef', chefSchema);
