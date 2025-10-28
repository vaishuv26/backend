const Chef = require('../models/Chef');

exports.getAllChefs = async (req, res) => {
  const chefs = await Chef.find();
  res.json(chefs);
};

exports.createChef = async (req, res) => {
  const chef = new Chef(req.body);
  await chef.save();
  res.status(201).json(chef);
};
