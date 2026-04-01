const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { loginAdmin, getAdminProfile } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;
