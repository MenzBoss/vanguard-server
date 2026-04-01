const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getGallery, getFeaturedGallery,
  createGalleryItem, updateGalleryItem, deleteGalleryItem
} = require('../controllers/galleryController');

router.get('/', getGallery);
router.get('/featured', getFeaturedGallery);
router.post('/', protect, createGalleryItem);
router.put('/:id', protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
