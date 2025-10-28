const Table = require('../models/Table');

exports.getTables = async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
};

exports.createTable = async (req, res) => {
  const maxNumber = await Table.countDocuments();
  req.body.number = maxNumber + 1;
  const table = new Table(req.body);
  await table.save();
  res.status(201).json(table);
};

exports.deleteTable = async (req, res) => {
  await Table.findByIdAndDelete(req.params.id);
  // Re-index table numbers
  const tables = await Table.find().sort('number');
  for (let i = 0; i < tables.length; i++) {
    tables[i].number = i + 1;
    await tables[i].save();
  }
  res.status(200).json({ message: 'Deleted and reindexed.' });
};

exports.reserveTable = async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    table.reserved = true;
    await table.save();
    res.json(table);
  } else {
    res.status(404).json({ message: 'Table not found.' });
  }
};
