const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/restaurantDB', { serverSelectionTimeoutMS: 2000 });
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
