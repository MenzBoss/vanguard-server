const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeScore: { type: Number, default: null },
    awayScore: { type: Number, default: null },
    date: { type: Date, required: true },
    matchday: { type: Number, required: true },
    competition: { type: String, default: 'League' },
    venue: { type: String, default: '' },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming',
    },
    highlights: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', matchSchema);
