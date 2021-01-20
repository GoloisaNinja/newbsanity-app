const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create new profile / Edit existing profile

router.post('/api/profiles', auth, async (req, res) => {
  const user = req.user;
  const _id = req.user._id;
  const {
    bio,
    age,
    gender,
    location,
    careerfield,
    currentfitnesslevel,
    goalfitnesslevel,
    personalwebsite,
    hobbies,
    facebook,
    instagram,
    reddit,
    twitter,
    linkedin,
    youtube,
  } = req.body;

  // build profile object
  let profileFields = {};
  profileFields.user = _id;
  profileFields.bio = bio || '';
  profileFields.age = age || 1;
  profileFields.gender = gender || '';
  profileFields.location = location || '';
  profileFields.careerfield = careerfield || '';
  profileFields.currentfitnesslevel = currentfitnesslevel || '';
  profileFields.goalfitnesslevel = goalfitnesslevel || '';
  profileFields.personalwebsite = personalwebsite || '';
  if (hobbies) {
    profileFields.hobbies = hobbies.split(',').map((hobby) => hobby.trim());
  }
  // build social object
  profileFields.social = {};
  profileFields.social.facebook = facebook || '';
  profileFields.social.instagram = instagram || '';
  profileFields.social.reddit = reddit || '';
  profileFields.social.twitter = twitter || '';
  profileFields.social.linkedin = linkedin || '';
  profileFields.social.youtube = youtube || '';
  try {
    let profile = await Profile.findOne({ user: _id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: _id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.status(200).json(profile);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

// Get all profiles

router.get('/api/profiles/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    if (profiles) {
      return res.status(200).send(profiles);
    } else {
      return res.status(404).send({ message: 'No profiles...' });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get a profile by Id

router.get('/api/profiles/:_id', async (req, res) => {
  const _id = req.params._id;
  try {
    const profile = await Profile.findOne({
      user: _id,
    }).populate('user', ['name']);
    console.log(profile);
    if (profile) {
      return res.status(200).send(profile);
    } else {
      return res.status(404).send({ message: 'No profile...' });
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
