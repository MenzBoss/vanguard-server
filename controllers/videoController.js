const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');

// @desc   Get all videos (with optional category filter)
// @route  GET /api/videos?category=Training
// @access Public
const getVideos = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};
  const videos = await Video.find(filter).sort({ createdAt: -1 });
  res.json(videos);
});

// @desc   Get featured videos (for homepage)
// @route  GET /api/videos/featured
// @access Public
const getFeaturedVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(6);
  res.json(videos);
});

// @desc   Create new video
// @route  POST /api/videos
// @access Protected (admin only)
const createVideo = asyncHandler(async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
});

// @desc   Update video
// @route  PUT /api/videos/:id
// @access Protected (admin only)
const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  Object.assign(video, req.body);
  await video.save();
  res.json(video);
});

// @desc   Delete video
// @route  DELETE /api/videos/:id
// @access Protected (admin only)
const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  res.json({ message: 'Video deleted successfully' });
});

module.exports = {
  getVideos,
  getFeaturedVideos,
  createVideo,
  updateVideo,
  deleteVideo
};
