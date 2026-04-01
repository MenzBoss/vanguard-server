const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');

const getGallery = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};
  const images = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json(images);
});

const getFeaturedGallery = asyncHandler(async (req, res) => {
  const images = await Gallery.find({ featured: true }).sort({ createdAt: -1 }).limit(8);
  res.json(images);
});

const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(item);
});

const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json({ message: 'Item deleted' });
});

module.exports = { getGallery, getFeaturedGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem };
