const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: 'All fields are required' });
  // In a real app, send email here via nodemailer
  res.json({ message: 'Message received. We will get back to you soon!' });
});

module.exports = router;
