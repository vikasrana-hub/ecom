const mongoose = require('mongoose');

let isConnected = false; // track the connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect("mongodb+srv://ecom:1234@cluster0.jbzwrpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || '');
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
