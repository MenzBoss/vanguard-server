const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getPlayers, getPlayerById, createPlayer,
  updatePlayer, deletePlayer, getAllPlayersAdmin
} = require('../controllers/playerController');

router.get('/', getPlayers);
router.get('/admin/all', protect, getAllPlayersAdmin);
router.get('/:id', getPlayerById);
router.post('/', protect, createPlayer);
router.put('/:id', protect, updatePlayer);
router.delete('/:id', protect, deletePlayer);

module.exports = router;
