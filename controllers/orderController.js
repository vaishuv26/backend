const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const orders = await Order.find().sort('-createdAt');
  res.json(orders);
};

exports.createOrder = async (req, res) => {
  // orderId is meant to be unique
  req.body.orderId = 'ORD' + Date.now();
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    { status: req.body.status },
    { new: true }
  );
  if (!order) res.status(404).json({ message: 'Order not found.' });
  else res.json(order);
};
