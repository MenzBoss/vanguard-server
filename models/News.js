const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['Club News', 'Match Report', 'Transfer', 'Youth', 'Community'],
      default: 'Club News',
    },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema);
