const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a restaurant name'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide a city'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      trim: true
    },
    cuisine: {
      type: String,
      required: [true, 'Please provide a cuisine type'],
      trim: true
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot exceed 5']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
