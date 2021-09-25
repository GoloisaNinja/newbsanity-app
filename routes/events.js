const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create new Event

router.post('/api/events/create', auth, async (req, res) => {
	const { title, text, mediaLink, mediaTypeIframe, date, time } = req.body;
	const user = await req.user;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please Authenticate' });
		}
		if (!user.isAdmin) {
			return res.status(400).send({ message: 'Not Authorized' });
		}

		const event = new Event({
			title,
			text,
			mediaLink,
			mediaTypeIframe,
			date,
			time,
		});
		await event.save();
		res.status(200).json(event);
	} catch (e) {
		console.error({ message: e.message });
		res.json({ message: e.message });
	}
});

// Admin Edit an existing Event (admin)

router.post('/api/events/admin/edit/:eventId', auth, async (req, res) => {
	const user = req.user;
	const _id = req.params.eventId;
	const { title, mediaLink, mediaTypeIframe, date, time, text } = req.body;

	// build event object
	let eventFields = {};
	eventFields.title = title;
	eventFields.mediaLink = mediaLink;
	eventFields.mediaTypeIframe = mediaTypeIframe;
	eventFields.date = date;
	eventFields.time = time;
	eventFields.text = text;
	try {
		if (!user) {
			return res.status(400).send({ message: 'Please authenticate' });
		}
		if (!user.isAdmin) {
			return res.status(400).send({ message: 'Not authorized' });
		}
		let event = await Event.findById({ _id });
		if (!event) {
			return res.status(404).send({ message: 'Event not found...' });
		}

		event = await Event.findOneAndUpdate(
			{ _id },
			{ $set: eventFields },
			{ new: true }
		);

		await event.save();
		res.status(200).json(event);
	} catch (e) {
		console.log(e);
		res.status(500).send(e.message);
	}
});

// Delete an Event

router.delete('/api/events/delete/:_id', auth, async (req, res) => {
	const user = await req.user;
	const _id = req.params._id;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please Authenticate' });
		}
		if (!user.isAdmin) {
			return res.status(400).send({ message: 'Not authorized' });
		}

		const event = await Event.findById({ _id });
		if (!event) {
			return res.status(404).send({ message: 'Could not find event...' });
		}

		await event.delete();
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
		const events = await Event.find().sort({ date: 1 });
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
	//const today = Date.now();
	try {
		// const events = await Event.find({ date: { $gte: today } })
		//   .sort({ date: 1 })
		//   .limit(4);
		// for portfolio purposes I will resume bringing in all events  - leaving
		// this code to remind myself how to pull in just events beyond a certain date
		const events = await Event.find().sort({ date: 1 });
		if (!events) {
			return res.status(404).send({ message: 'No Events...' });
		}
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

// Register for an Event by Id

router.post('/api/event/register/:_id', auth, async (req, res) => {
	const user = req.user;
	const { name, id } = user;
	const text = req.body.text;
	const _id = req.params._id;
	const eventFields = {};
	eventFields.user = id;
	eventFields.name = name;
	eventFields.text = text || '';
	try {
		const event = await Event.findById({ _id });
		const profile = await Profile.findOne({ user: id });
		if (!event) {
			return res.status(404).send({ message: 'Could not find event...' });
		}
		const registered = event.registration.filter(
			(register) => register.user.toString() === id
		);
		if (registered.length > 0) {
			return res
				.status(400)
				.send({ message: 'You already registered for this event' });
		}
		event.registration.unshift(eventFields);
		await event.save();
		const { title, date, time } = event;
		const regDeets = {
			event: _id,
			eventName: title,
			eventDate: date,
			eventTime: time,
		};
		profile.registeredEvents.unshift(regDeets);
		await profile.save();
		res.status(200).send(event.registration);
	} catch (e) {
		if (e.kind === 'ObjectId') {
			res.status(404).send({ message: 'Could not find event...' });
		}
		res.status(400).send({ message: e.message });
	}
});

// Unregister for an Event by Id

router.post('/api/event/unregister/:_id', auth, async (req, res) => {
	const user = req.user;
	const { name, id } = user;
	const _id = req.params._id;
	try {
		const event = await Event.findById({ _id });
		const profile = await Profile.findOne({ user: id });
		if (!event) {
			return res.status(404).send({ message: 'Could not find event...' });
		}
		const registered = event.registration.filter(
			(register) => register.user.toString() === id
		);
		if (registered.length === 0) {
			return res
				.status(400)
				.send({ message: 'You are not registered for this event' });
		}
		event.registration = event.registration.filter(
			(event) => event.user.toString() !== id
		);
		await event.save();

		profile.registeredEvents = profile.registeredEvents.filter(
			(register) => register.event.toString() !== event._id.toString()
		);
		await profile.save();
		res.status(200).send(event.registration);
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
);

module.exports = router;
