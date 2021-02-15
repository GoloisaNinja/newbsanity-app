const express = require('express');
const router = express.Router();
const Obstacle = require('../models/Obstacle');

// Get all Obstacles

router.get('/api/obstacles', async (req, res) => {
  try {
    const obstacles = await Obstacle.find();
    if (!obstacles) {
      return res.status(404).send({ message: 'No Obstacles...' });
    }
    res.status(200).send(obstacles);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
