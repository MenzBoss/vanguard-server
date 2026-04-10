const mongoose = require('mongoose');

const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not set. Configure it in your environment variables.');
  }

  if (
    process.env.NODE_ENV === 'production' &&
    /localhost|127\.0\.0\.1|::1/.test(mongoUri)
  ) {
    throw new Error('MONGO_URI points to localhost in production. Use a remote MongoDB URI (for example MongoDB Atlas).');
  }

  const maxRetries = parsePositiveInt(process.env.MONGO_CONNECT_RETRIES, 4);
  const retryDelayMs = parsePositiveInt(process.env.MONGO_RETRY_DELAY_MS, 3000);
  const serverSelectionTimeoutMS = parsePositiveInt(
    process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS,
    15000
  );

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      lastError = error;
      console.error(
        `MongoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  throw new Error(`MongoDB connection failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`);
};

module.exports = connectDB;
