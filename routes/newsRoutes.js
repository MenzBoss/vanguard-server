const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getNews, getFeaturedNews, getNewsBySlug,
  createNews, updateNews, deleteNews, getAllNewsAdmin
} = require('../controllers/newsController');

router.get('/', getNews);
router.get('/featured', getFeaturedNews);
router.get('/admin/all', protect, getAllNewsAdmin);
router.get('/:slug', getNewsBySlug);
router.post('/', protect, createNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
