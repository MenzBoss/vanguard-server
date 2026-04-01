const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');

const getMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find().sort({ date: 1 });
  res.json(matches);
});

const getUpcomingMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find({ status: 'upcoming' }).sort({ date: 1 }).limit(5);
  res.json(matches);
});

const getResults = asyncHandler(async (req, res) => {
  const matches = await Match.find({ status: 'completed' }).sort({ date: -1 }).limit(10);
  res.json(matches);
});

const getMatchById = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

const createMatch = asyncHandler(async (req, res) => {
  const match = await Match.create(req.body);
  res.status(201).json(match);
});

const updateMatch = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  Object.assign(match, req.body);
  await match.save();
  res.json(match);
});

const deleteMatch = asyncHandler(async (req, res) => {
  const match = await Match.findByIdAndDelete(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json({ message: 'Match deleted' });
});

module.exports = { getMatches, getUpcomingMatches, getResults, getMatchById, createMatch, updateMatch, deleteMatch };
