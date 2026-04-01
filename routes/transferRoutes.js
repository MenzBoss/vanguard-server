const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getTransfers, createTransfer, updateTransfer, deleteTransfer } = require('../controllers/transferController');

router.get('/', getTransfers);
router.post('/', protect, createTransfer);
router.put('/:id', protect, updateTransfer);
router.delete('/:id', protect, deleteTransfer);

module.exports = router;
