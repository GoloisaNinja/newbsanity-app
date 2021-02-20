const express = require('express');
const router = express.Router();
const Obstacle = require('../models/Obstacle');
const auth = require('../middleware/auth');

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

// Admin delete an Obstacle by Id

router.delete(
  '/api/obstacles/admin/delete/:obstacleId',
  auth,
  async (req, res) => {
    const user = await req.user;
    const id = req.params.obstacleId;
    try {
      if (!user) {
        return res.status(401).send({ message: 'Please authenticate' });
      }
      if (!user.isAdmin) {
        return res.status(400).send({ message: 'Not authorized' });
      }
      const obstacle = await Obstacle.findById(id);
      await obstacle.delete();
      res.status(200).send({ message: 'Obstacle successfully deleted' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message });
    }
  }
);

module.exports = router;
