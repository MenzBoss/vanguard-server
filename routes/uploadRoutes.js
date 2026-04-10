const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Images only'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  // Prefer configured public server URL in production; otherwise build from request host.
  const publicServerUrl = process.env.PUBLIC_SERVER_URL?.trim().replace(/\/+$/, '');
  const requestBaseUrl = `${req.protocol}://${req.get('host')}`.replace(/\/+$/, '');
  const fileBaseUrl = publicServerUrl || requestBaseUrl;

  res.json({ url: `${fileBaseUrl}/uploads/${req.file.filename}` });
});

module.exports = router;
