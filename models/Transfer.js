const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema(
  {
    playerName: { type: String, required: true },
    photo: { type: String, default: '' },
    type: { type: String, enum: ['IN', 'OUT', 'LOAN IN', 'LOAN OUT'], required: true },
    fromClub: { type: String, default: '' },
    toClub: { type: String, default: '' },
    fee: { type: String, default: 'Undisclosed' },
    position: { type: String, default: '' },
    nationality: { type: String, default: '' },
    date: { type: Date, required: true },
    season: { type: String, default: '2024/25' },
    announced: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transfer', transferSchema);
