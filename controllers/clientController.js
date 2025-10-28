const Client = require('../models/Client');

exports.getClients = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

exports.createClient = async (req, res) => {
  const existing = await Client.findOne({ phone: req.body.phone });
  if (existing) {
    return res.status(200).json(existing);
  }
  const client = new Client(req.body);
  await client.save();
  res.status(201).json(client);
};
