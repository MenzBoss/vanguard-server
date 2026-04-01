const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ _id: admin._id, name: admin.name, email: admin.email, token: generateToken(admin._id) });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  res.json({ _id: req.admin._id, name: req.admin.name, email: req.admin.email });
});

module.exports = { loginAdmin, getAdminProfile };
