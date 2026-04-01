const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: {
      type: String,
      enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
      required: true,
    },
    number: { type: Number, required: true },
    photo: { type: String, default: '' },
    nationality: { type: String, default: '' },
    age: { type: Number },
    appearances: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
