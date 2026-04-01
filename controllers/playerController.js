const asyncHandler = require('express-async-handler');
const Player = require('../models/Player');

const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find({ isActive: true }).sort({ number: 1 });
  res.json(players);
});

const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  res.json(player);
});

const createPlayer = asyncHandler(async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json(player);
});

const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  Object.assign(player, req.body);
  await player.save();
  res.json(player);
});

const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  if (!player) return res.status(404).json({ message: 'Player not found' });
  res.json({ message: 'Player deleted' });
});

const getAllPlayersAdmin = asyncHandler(async (req, res) => {
  const players = await Player.find().sort({ number: 1 });
  res.json(players);
});

module.exports = { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer, getAllPlayersAdmin };
