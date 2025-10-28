const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  address: String
});

module.exports = mongoose.model('Client', clientSchema);
