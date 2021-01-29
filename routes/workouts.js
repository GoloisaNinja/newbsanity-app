const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

// Create new Workout

router.post('/api/workouts', auth, async (req, res) => {
  const {
    extremeRavineLaps = 0,
    mudGauntletLaps = 0,
    workoutPartner = '',
    text = '',
    date,
  } = req.body;
  const user = await req.user;
  const dateParts = date.split('-');
  const formatDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  const { name, id } = user;
  try {
    if (!user) {
      throw new Error('Please authenticate...');
    }
    const workout = new Workout({
      user: id,
      name,
      extremeRavineLaps,
      mudGauntletLaps,
      workoutPartner,
      text,
      date: formatDate,
    });
    await workout.save();
    res.status(200).json(workout);
  } catch (e) {
    console.error({ message: e.message });
    res.json({ message: e.message });
  }
});

// Delete a Workout

router.delete('/api/workouts/delete/:_id', auth, async (req, res) => {
  const _id = req.params._id;
  const user = await req.user;
  const { id } = user;
  try {
    const workout = await Workout.findById({ _id });
    if (!workout) {
      return res.status(404).send({ message: 'Could not find workout...' });
    }
    await workout.remove();
    res.status(200).send({ message: 'Workout successfully deleted...' });
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find workout...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Get all Workouts

router.get('/api/workouts/all', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: 1 });
    if (!workouts) {
      return res.status(404).send({ message: 'No Workouts by members...' });
    }
    res.status(200).send(workouts);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get a Workout by Id

router.get('/api/workouts/workout/:_id', async (req, res) => {
  const _id = req.params._id;
  try {
    const workout = await Workout.findById({ _id });
    if (!workout) {
      return res.status(404).send({ message: 'Could not find workout...' });
    }
    res.status(200).send(workout);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find workout...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Get all Workout by User Id

router.get('/api/workouts/user', auth, async (req, res) => {
  const user = req.user;
  const { name, id } = user;
  try {
    const workouts = await Workout.find({ user: id }).sort({ date: -1 });
    if (!workouts) {
      return res
        .status(404)
        .send({ message: 'Could not find any workouts...' });
    }
    res.status(200).send(workouts);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find workout...' });
    }
    res.status(400).send({ message: e.message });
  }
});

///// THESE NEED TO BE REFACTORED FOR WORKOUTS THEY STILL REFLECT EVENT DATA //////////

/*

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
  const _id = req.params.eventId;
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
      const event = await Event.findById(eventId);
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
      console.log(event.comments);
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
); */

module.exports = router;
