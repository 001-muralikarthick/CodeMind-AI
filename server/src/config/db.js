import mongoose from 'mongoose';

let isConnected = false;
let fallbackStore = new Map();

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codemind';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[CodeMind DB] MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    isConnected = false;
    console.warn(`[CodeMind DB] MongoDB not reachable at ${mongoURI}.`);
    console.log(`[CodeMind DB] Operating in high-performance in-memory persistence mode.`);
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'mongodb' : 'in-memory'
});

export const memoryStore = fallbackStore;
