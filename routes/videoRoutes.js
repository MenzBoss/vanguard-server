const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getVideos,
  getFeaturedVideos,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

// Public routes
router.get('/', getVideos);
router.get('/featured', getFeaturedVideos);

// Protected admin routes
router.post('/', protect, createVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
