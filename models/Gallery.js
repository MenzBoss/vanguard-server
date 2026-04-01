const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['Match Day', 'Training', 'Events', 'Stadium', 'Community'],
      default: 'Match Day',
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
