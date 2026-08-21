const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Ninad2008:kis6D9gtkwS9OvW0@cluster0.uricfp6.mongodb.net/?appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    } catch (memErr) {
      console.log("MongoDB connection error: ", memErr);
    }
  }
};

connectDB();

const db = mongoose.connection;

db.on("connected", () => {
    console.log("MongoDB connected successfully");
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

db.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
});

module.exports = db;
