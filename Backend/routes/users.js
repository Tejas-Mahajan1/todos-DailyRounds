const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create initial users (for testing)
router.post('/seed', async (req, res) => {
  try {
    const users = [
      { username: 'john_doe', email: 'john@example.com' },
      { username: 'jane_smith', email: 'jane@example.com' },
      { username: 'bob_wilson', email: 'bob@example.com' },
      { username: 'alice_brown', email: 'alice@example.com' },
      { username: 'charlie_davis', email: 'charlie@example.com' }
    ];

    const createdUsers = await User.insertMany(users);
    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 