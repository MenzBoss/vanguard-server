const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://192.168.12.54:5173',
  'https://fcvanguard.live',
  'https://www.fcvanguard.live',
];
const allowedOrigins = (process.env.CORS_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin or non-browser clients (origin header missing)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const corsError = new Error(`CORS blocked for origin: ${origin}`);
    corsError.statusCode = 403;
    return callback(corsError);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/players', require('./routes/playerRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/transfers', require('./routes/transferRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'FC Vanguard API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
