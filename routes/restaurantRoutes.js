const express = require('express');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const { protect } = require('../server');

const router = express.Router();

// GET /restaurants/top -> Show top 5 restaurants based on rating
router.get('/top', async (req, res, next) => {
  try {
    const topRestaurants = await Restaurant.find().sort({ rating: -1 }).limit(5);
    res.status(200).json(topRestaurants);
  } catch (error) {
    next(error);
  }
});

// GET /restaurants -> Get list of all restaurants
router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
});

// POST /restaurants -> Add a new restaurant (Protected)
router.post('/', protect, async (req, res, next) => {
  try {
    const { name, city, address, cuisine, rating } = req.body;

    if (!name || !city || !address || !cuisine || rating === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const restaurant = await Restaurant.create({ name, city, address, cuisine, rating });
    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
  } catch (error) {
    next(error);
  }
});

// GET /restaurants/:id -> Get restaurant by ID
router.get('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
});

// PUT /restaurants/:id -> Update restaurant details (Protected)
router.put('/:id', protect, async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant });
  } catch (error) {
    next(error);
  }
});

// DELETE /restaurants/:id -> Delete restaurant by ID (Protected)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    await MenuItem.deleteMany({ restaurantId: req.params.id });
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /restaurants/:id/menu -> Get all menu items for a specific restaurant
router.get('/:id/menu', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    const menuItems = await MenuItem.find({ restaurantId: req.params.id });
    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
});

// POST /restaurants/:id/menu -> Add menu item to restaurant (Protected)
router.post('/:id/menu', protect, async (req, res, next) => {
  try {
    const { name, price, isAvailable } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const menuItem = await MenuItem.create({
      restaurantId: req.params.id,
      name,
      price,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    res.status(201).json({ message: 'Menu item added successfully', menuItem });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
