const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: { type: String, unique: true },
  table: { type: Number },
  type: { type: String, enum: ['DINE_IN', 'TAKEAWAY'], required: true },
  items: [String],
  itemCount: { type: Number },
  clientName: String,
  phone: String,
  address: String,
  chef: { type: Schema.Types.ObjectId, ref: 'Chef' },
  processingTime: Number,
  status: { type: String, enum: ['PROCESSING', 'DONE', 'SERVED', 'NOT_PICKED_UP'], default: 'PROCESSING' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
