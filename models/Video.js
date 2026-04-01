const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    youtubeId: {
      type: String,
      required: true,
      trim: true,
      match: [/^[a-zA-Z0-9_-]{11}$/, 'Please provide a valid YouTube video ID']
    },
    duration: {
      type: String,
      default: '0:00',
      trim: true
    },
    category: {
      type: String,
      enum: ['Match Highlights', 'Training', 'Behind the Scenes', 'Interviews', 'Youth Academy'],
      default: 'Match Highlights',
    },
    featured: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field to auto-generate thumbnail URL from youtubeId
videoSchema.virtual('thumbnail').get(function() {
  return `https://img.youtube.com/vi/${this.youtubeId}/maxresdefault.jpg`;
});

module.exports = mongoose.model('Video', videoSchema);
