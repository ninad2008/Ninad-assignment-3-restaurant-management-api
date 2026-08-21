const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect } = require('../server');

const router = express.Router();

// PUT /menu/:id -> Update menu item details (Protected)
router.put('/:id', protect, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item updated successfully', menuItem });
  } catch (error) {
    next(error);
  }
});

// DELETE /menu/:id -> Delete menu item by ID (Protected)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
