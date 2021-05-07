const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Profile = require('../models/Profile');
const Trophy = require('../models/Trophy');
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
		const profile = await Profile.findOne({ user: id });
		if (!profile) {
			throw new Error('Profile not found...');
		}
		if (profile.workouts.length === 0) {
			const trophy = await Trophy.findOne({ serial: 'firstWorkoutLvl001' });
			const trophyFields = {
				trophy: trophy._id,
				title: trophy.title,
				body: trophy.body,
				icon: trophy.icon,
				userSeen: false,
			};
			profile.trophies.unshift(trophyFields);
			await profile.save();
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
		const profWorkout = {
			workout: workout._id,
			extremeRavineLaps,
			mudGauntletLaps,
			workoutPartner,
			text,
			date: formatDate,
		};
		profile.workouts.unshift(profWorkout);

		const {
			ravineClubTotal,
			ravineTotal,
			gauntletClubTotal,
			gauntletTotal,
		} = profile.centuryClub;

		// Extreme Ravine Club Total Adjustment

		if (Number(ravineTotal) + Number(extremeRavineLaps) < 50) {
			ravineAdjustment = Number(extremeRavineLaps);
		} else if (
			Number(ravineTotal) < 50 &&
			Number(ravineTotal) + Number(extremeRavineLaps) >= 50 &&
			Number(ravineTotal) + Number(extremeRavineLaps) < 100
		) {
			ravineAdjustment = 50 - Number(ravineTotal);
		} else if (
			Number(ravineTotal) > 50 &&
			Number(ravineTotal) + Number(extremeRavineLaps) >= 50 &&
			Number(ravineTotal) + Number(extremeRavineLaps) < 100
		) {
			ravineAdjustment = 0;
		} else {
			ravineAdjustment = Number(extremeRavineLaps);
		}

		// Mud Gauntlet Club Total Adjustment

		if (Number(gauntletTotal) + Number(mudGauntletLaps) < 50) {
			mudAdjustment = Number(mudGauntletLaps);
		} else if (
			Number(gauntletTotal) < 50 &&
			Number(gauntletTotal) + Number(mudGauntletLaps) >= 50 &&
			Number(gauntletTotal) + Number(mudGauntletLaps) < 100
		) {
			mudAdjustment = 50 - Number(gauntletTotal);
		} else if (
			Number(gauntletTotal) > 50 &&
			Number(gauntletTotal) + Number(mudGauntletLaps) >= 50 &&
			Number(gauntletTotal) + Number(mudGauntletLaps) < 100
		) {
			mudAdjustment = 0;
		} else {
			mudAdjustment = Number(mudGauntletLaps);
		}

		// Set values for profile updates

		const newRavineClub = Number(ravineClubTotal) + Number(ravineAdjustment);
		const newGauntletClub = Number(gauntletClubTotal) + Number(mudGauntletLaps);
		const newRavine = Number(ravineTotal) + Number(extremeRavineLaps);
		const newGauntlet = Number(gauntletTotal) + Number(mudGauntletLaps);

		profile.centuryClub = {
			ravineClubTotal: newRavineClub,
			gauntletClubTotal: newGauntletClub,
			ravineTotal: newRavine,
			gauntletTotal: newGauntlet,
		};

		await profile.save();
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
		const profile = await Profile.findOne({ user: id });
		if (!profile) {
			return res.status(404).send({ message: 'Could not find profile...' });
		}
		profile.workouts = profile.workouts.filter(
			(workout) => workout.workout.toString() !== _id.toString()
		);
		const { extremeRavineLaps, mudGauntletLaps } = workout;

		const {
			ravineClubTotal,
			ravineTotal,
			gauntletClubTotal,
			gauntletTotal,
		} = profile.centuryClub;

		// Extreme Ravine Club Total Adjustment

		if (extremeRavineLaps !== 0) {
			if (
				ravineClubTotal >= 50 &&
				ravineClubTotal < 100 &&
				ravineTotal - extremeRavineLaps >= 50
			) {
				ravineAdjustment = 0;
			} else if (
				ravineClubTotal >= 50 &&
				ravineClubTotal < 100 &&
				ravineTotal - extremeRavineLaps < 50
			) {
				ravineAdjustment = 50 - (ravineTotal - extremeRavineLaps);
			} else {
				ravineAdjustment = extremeRavineLaps;
			}
		} else {
			ravineAdjustment = 0;
		}
		// Mud Gauntlet Club Total Adjustment

		if (mudGauntletLaps !== 0) {
			if (
				gauntletClubTotal >= 50 &&
				gauntletClubTotal < 100 &&
				gauntletTotal - mudGauntletLaps >= 50
			) {
				mudAdjustment = 0;
			} else if (
				gauntletClubTotal >= 50 &&
				gauntletClubTotal < 100 &&
				gauntletTotal - mudGauntletLaps < 50
			) {
				mudAdjustment = 50 - (gauntletTotal - mudGauntletLaps);
			} else {
				mudAdjustment = mudGauntletLaps;
			}
		} else {
			mudAdjustment = 0;
		}
		// Set values for profile updates

		const newRavineClub = Number(ravineClubTotal) - Number(ravineAdjustment);
		const newGauntletClub = Number(gauntletClubTotal) - Number(mudGauntletLaps);
		const newRavine = Number(ravineTotal) - Number(extremeRavineLaps);
		const newGauntlet = Number(gauntletTotal) - Number(mudGauntletLaps);

		profile.centuryClub = {
			ravineClubTotal: newRavineClub,
			gauntletClubTotal: newGauntletClub,
			ravineTotal: newRavine,
			gauntletTotal: newGauntlet,
		};
		await workout.remove();
		await profile.save();
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
