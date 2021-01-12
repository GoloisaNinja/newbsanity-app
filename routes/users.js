const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');

// Load authenticated User

router.get('/api/users/auth', auth, async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      return res.status(200).json(user);
    } else {
      throw new Error('Please authenticate');
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// Create new User

router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Login the user

router.post('/api/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (e) {
    res.status(401).send({ message: 'Login failed...' });
  }
});

// Logout the user

router.post('/api/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send('User logged out');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Logout all user instances

router.post('/api/user/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send('All user sessions logged out');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Set up Multer for Avatar Upload

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'));
    }

    cb(undefined, true);
  },
});

// User Upload Route - use sharp to format to png and size

router.post(
  '/api/user/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const user = await req.user;
    user.avatar = buffer;
    await user.save();
    res.send('Avatar image uploaded successfully...');
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// User Delete Avatar Route

router.delete('/api/user/me/avatar', auth, async (req, res) => {
  const user = await req.user;
  user.avatar = undefined;
  await user.save();
  res.send('Profile avatar deleted successfully...');
});

// Get User Avatar Binary

router.get('/api/user/:id/avatar', async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user || !user.avatar) {
      return res.status(400).send({ message: 'Not found' });
    }

    res.set('Content-Type', 'image/png');
    res.status(200).send(user.avatar);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
