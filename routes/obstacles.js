const express = require('express');
const router = express.Router();
const Obstacle = require('../models/Obstacle');
const auth = require('../middleware/auth');

// Admin Create Obstacle (admin)

router.post('/api/obstacles/admin/create', auth, async (req, res) => {
  const user = req.user;
  const { name1, name2, src, description } = req.body;

  // build obstacle object
  let obstacleFields = {};
  obstacleFields.name1 = name1;
  obstacleFields.name2 = name2 || '';
  obstacleFields.src = src;
  obstacleFields.description = description;
  try {
    if (!user) {
      return res.status(400).send({ message: 'Please authenticate' });
    }
    if (!user.isAdmin) {
      return res.status(400).send({ message: 'Not authorized' });
    }
    const obstacle = new Obstacle(obstacleFields);
    await obstacle.save();
    res.status(200).json(obstacle);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

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

// Admin Edit an existing Obstacle (admin)

router.post('/api/obstacles/admin/edit/:obstacleId', auth, async (req, res) => {
  const user = req.user;
  const _id = req.params.obstacleId;
  const { name1, name2, src, description } = req.body;

  // build obstacle object
  let obstacleFields = {};
  obstacleFields.name1 = name1;
  obstacleFields.name2 = name2 || '';
  obstacleFields.src = src;
  obstacleFields.description = description;
  try {
    if (!user) {
      return res.status(400).send({ message: 'Please authenticate' });
    }
    if (!user.isAdmin) {
      return res.status(400).send({ message: 'Not authorized' });
    }
    let obstacle = await Obstacle.findById({ _id });
    if (!obstacle) {
      return res.status(404).send({ message: 'Obstacle not found...' });
    }

    obstacle = await Obstacle.findOneAndUpdate(
      { _id },
      { $set: obstacleFields },
      { new: true }
    );

    await obstacle.save();
    res.status(200).json(obstacle);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

// Admin get an Obstacle by Id

router.get(
  '/api/obstacles/admin/obstacle/:obstacleId',
  auth,
  async (req, res) => {
    const user = await req.user;
    const _id = req.params.obstacleId;
    try {
      if (!user) {
        return res.status(401).send({ message: 'Please authenticate' });
      }
      if (!user.isAdmin) {
        return res.status(400).send({ message: 'Not authorized' });
      }
      const obstacle = await Obstacle.findById({ _id });
      res.status(200).send(obstacle);
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message });
    }
  }
);

// Admin delete an Obstacle by Id

router.delete(
  '/api/obstacles/admin/delete/:obstacleId',
  auth,
  async (req, res) => {
    const user = await req.user;
    const _id = req.params.obstacleId;
    try {
      if (!user) {
        return res.status(401).send({ message: 'Please authenticate' });
      }
      if (!user.isAdmin) {
        return res.status(400).send({ message: 'Not authorized' });
      }
      const obstacle = await Obstacle.findById({ _id });
      await obstacle.delete();
      res.status(200).send({ message: 'Obstacle successfully deleted' });
    } catch (e) {
      console.log(e);
      res.status(400).send({ message: e.message });
    }
  }
);

module.exports = router;
