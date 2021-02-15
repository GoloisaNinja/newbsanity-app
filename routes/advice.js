const express = require('express');
const router = express.Router();
const Advice = require('../models/Advice');

// Get Advice

router.get('/api/advice', async (req, res) => {
  try {
    const adviceCount = await Advice.countDocuments();
    const random = Math.floor(Math.random() * adviceCount);
    const advice = await Advice.findOne().skip(random);
    if (!advice) {
      return res.status(404).send({ message: 'No Advice...' });
    }
    res.status(200).send(advice);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
