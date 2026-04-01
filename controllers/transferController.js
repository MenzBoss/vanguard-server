const asyncHandler = require('express-async-handler');
const Transfer = require('../models/Transfer');

const getTransfers = asyncHandler(async (req, res) => {
  const season = req.query.season;
  const type = req.query.type;
  const filter = { announced: true };
  if (season) filter.season = season;
  if (type) filter.type = type;
  const transfers = await Transfer.find(filter).sort({ date: -1 });
  res.json(transfers);
});

const createTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.create(req.body);
  res.status(201).json(transfer);
});

const updateTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findById(req.params.id);
  if (!transfer) return res.status(404).json({ message: 'Transfer not found' });
  Object.assign(transfer, req.body);
  await transfer.save();
  res.json(transfer);
});

const deleteTransfer = asyncHandler(async (req, res) => {
  const transfer = await Transfer.findByIdAndDelete(req.params.id);
  if (!transfer) return res.status(404).json({ message: 'Transfer not found' });
  res.json({ message: 'Transfer deleted' });
});

module.exports = { getTransfers, createTransfer, updateTransfer, deleteTransfer };
