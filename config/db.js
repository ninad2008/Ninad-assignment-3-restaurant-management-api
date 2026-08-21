const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://devdharesulochana_db_user:KVRxWMW8Ec5ZY3My@project.lsc4rnz.mongodb.net/restaurantDB?retryWrites=true&w=majority';

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
