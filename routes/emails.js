const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../emails/account');

// Send Contact Email

router.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    sendContactEmail(name, email, subject, message);
    res.status(200).send({ message: 'Contact email sent' });
  } catch (e) {
    console.error(e.message, e.stack);
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
