const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create new Event

router.post('/api/events', auth, async (req, res) => {
  const { title, text, mediaLink, mediaTypeIframe, date, time } = req.body;
  const user = await req.user;
  const dateParts = date.split('/');
  const formatDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const { name, id } = user;
  try {
    if (!user) {
      throw new Error('Please authenticate...');
    }
    const event = new Event({
      title,
      text,
      mediaLink,
      mediaTypeIframe,
      date: formatDate,
      time,
    });
    await event.save();
    res.status(200).json(event);
  } catch (e) {
    console.error({ message: e.message });
    res.json({ message: e.message });
  }
});

// Delete an Event

router.delete('/api/events/delete/:_id', auth, async (req, res) => {
  const _id = req.params._id;
  const user = await req.user;
  const { id } = user;
  try {
    const event = await Post.findById({ _id });
    if (!event) {
      return res.status(404).send({ message: 'Could not find event...' });
    }
    // need to handle auth for Jarrett and CMS
    // if (post.user.toString() !== id) {
    //   return res.status(403).send({ message: 'Not authorized' });
    // }
    await post.remove();
    res.status(200).send({ message: 'Event successfully removed...' });
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Get all Events

router.get('/api/events/all', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    if (!events) {
      return res.status(404).send({ message: 'No Events...' });
    }
    res.status(200).send(events);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get LandingPage Events (4 events)

router.get('/api/events/landing', async (req, res) => {
  const today = Date.now();
  try {
    const events = await Event.find({ date: { $gte: today } })
      .sort({ date: 1 })
      .limit(4);
    if (!events) {
      return res.status(404).send({ message: 'No Events...' });
    }
    res.status(200).send(events);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get a Event by Id

router.get('/api/events/event/:_id', async (req, res) => {
  const _id = req.params._id;
  try {
    const event = await Event.findById({ _id });
    if (!event) {
      return res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(200).send(event);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Like an Event

router.post('/api/events/like/:eventId', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.eventId;
  try {
    if (!user) {
      return res
        .status(401)
        .send({ message: 'You must be signed in to like an event' });
    }
    const event = await Event.findById({ _id });
    const liked = event.likes.filter((like) => like.user.toString() === id);
    if (liked.length > 0) {
      return res.status(400).send({ message: 'You already like this event' });
    }
    event.likes.unshift({ user: id });
    await event.save();
    res.status(200).json(event.likes);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Unlike an Event

router.post('/api/events/unlike/:eventId', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.eventId;
  try {
    if (!user) {
      return res.status(401).send({
        message: 'You must be looged in before you can like/unlike events...',
      });
    }
    const event = await Event.findById({ _id });
    const liked = event.likes.filter((like) => like.user.toString() === id);
    if (liked.length === 0) {
      return res
        .status(400)
        .send({ message: 'You have not liked this event yet...' });
    }
    event.likes = event.likes.filter((like) => like.user.toString() !== id);
    await event.save();
    res.status(200).json(event.likes);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Comment on an Event

router.post('/api/events/comment/:eventId', auth, async (req, res) => {
  const user = await req.user;
  const { name, id } = user;
  const _id = req.params.postId;
  const text = req.body.text;
  try {
    if (!user) {
      return res.status(401).send({ message: 'Please authenticate ' });
    }
    const event = await Event.findById({ _id });
    if (!event) {
      return res.status(404).send({ message: 'Could not find event...' });
    }
    const comment = {
      user: id,
      name,
      text,
    };
    event.comments.unshift(comment);
    await event.save();
    res.status(200).send(event.comments);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find event...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Delete a comment on an Event

router.delete(
  '/api/events/deletecomment/:eventId/:commentId',
  auth,
  async (req, res) => {
    const user = await req.user;
    const { id } = user;
    const eventId = req.params.eventId;
    const comId = req.params.commentId;
    try {
      if (!user) {
        return res.status(201).send({ message: 'Please authenticate ' });
      }
      const event = await Event.findById(postId);
      if (!event) {
        return res.status(404).send({ message: 'Could not find event...' });
      }
      const index = event.comments.findIndex(
        (comment) =>
          comment._id.toString() === comId && comment.user.toString() === id
      );
      console.log(index);
      if (index === -1) {
        return res.status(404).send({
          message: 'Could not find comment or not authorized to delete',
        });
      }
      event.comments.splice(index, 1);
      console.log(post.comments);
      await event.save();
      res
        .status(200)
        .send({ message: 'You thought better of that comment...' });
    } catch (e) {
      if (e.kind === 'ObjectId') {
        res.status(404).send({ message: 'Could not find event...' });
      }
      res.status(400).send({ message: e.message });
    }
  }
);

module.exports = router;
