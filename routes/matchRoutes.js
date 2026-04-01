const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMatches, getUpcomingMatches, getResults,
  getMatchById, createMatch, updateMatch, deleteMatch
} = require('../controllers/matchController');

router.get('/', getMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/results', getResults);
router.get('/:id', getMatchById);
router.post('/', protect, createMatch);
router.put('/:id', protect, updateMatch);
router.delete('/:id', protect, deleteMatch);

module.exports = router;
