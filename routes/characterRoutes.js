const express = require('express');
const Character = require('../models/Character');

const router = express.Router();

// Create a new character
router.post('/create', async (req, res) => {
  const { userId, name, healthPoints, resources } = req.body;
  try {
    const character = new Character({ userId, name, healthPoints, resources });
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create character' });
  }
});

// Get characters for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.params.userId });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// Update a character
router.put('/update/:characterId', async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.characterId, req.body, { new: true });
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update character' });
  }
});

module.exports = router;
