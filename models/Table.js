const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  size: { type: Number, enum: [2, 4, 6, 8], required: true },
  reserved: { type: Boolean, default: false },
  name: { type: String },
  members: { type: Number },
});

module.exports = mongoose.model('Table', tableSchema);
