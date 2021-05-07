const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Trophy = require('../models/Trophy');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create new Trophy

router.post('/api/trophies', auth, async (req, res) => {
	const { serial, title, body, icon } = req.body;
	const user = await req.user;
	const { name, id } = user;
	try {
		if (!user) {
			throw new Error('Please authenticate...');
		}
		const trophy = new Trophy({
			serial,
			title,
			body,
			icon,
		});
		await trophy.save();
		res.status(200).json(trophy);
	} catch (e) {
		console.error({ message: e.message });
		res.json({ message: e.message });
	}
});

// Assign a trophy to a profile

router.post('/api/trophies/assign/:trophyId', auth, async (req, res) => {
	const user = await req.user;
	const { id, name } = user;
	const trophyId = req.params.trophyId;
	try {
		const profile = await Profile.findOne({ user: id });
		if (!profile) {
			return res.status(400).send({ message: 'Unable to perform action...' });
		}
		const trophy = await Trophy.findOne({ _id: trophyId });
		if (!trophy) {
			return res.status(404).send({ message: 'No trophy found...' });
		}
		const alreadyAwarded = profile.trophies.filter(
			(trophy) => trophy.trophy.toString() === trophyId.toString()
		);

		if (alreadyAwarded.length > 0) {
			return res
				.status(400)
				.send({ message: 'Trophy already rewarded to user' });
		} else {
			const trophyFields = {
				trophy: trophy._id,
				title: trophy.title,
				body: trophy.body,
				icon: trophy.icon,
				userSeen: false,
			};
			profile.trophies.unshift(trophyFields);
			await profile.save();
			res.status(200).send(trophy);
		}
	} catch (e) {
		console.error({ message: e.message });
		res.json({ message: e.message, stack: e.stack });
	}
});

// Mark a Trophy as seen by user

router.post('/api/trophies/markAsSeen/:trophyId', auth, async (req, res) => {
	const user = await req.user;
	const { id } = user;
	const trophyId = req.params.trophyId;
	try {
		const trophy = await Trophy.findById(trophyId);
		if (!trophy) {
			return res.status(404).send({ message: 'No Trophy...' });
		}
		const profile = await Profile.findOne({ user: id });
		if (!profile) {
			return res.status(404).send({ message: 'No Profile...' });
		}
		profile.trophies.map((trophy) => {
			if (trophy.trophy.toString() === trophyId.toString()) {
				trophy.userSeen = true;
			}
		});
		await profile.save();
		res.status(200).send(trophy);
	} catch (e) {
		console.error({ message: e.message });
		res.json({ message: e.message, stack: e.stack });
	}
});

// Get user unseen Trophies

router.get('/api/trophies/user', auth, async (req, res) => {
	const user = await req.user;
	const { id } = user;
	try {
		const profile = await Profile.findOne({ user: id });
		if (!profile) {
			return res.status(404).send({ message: 'No profile or trophies...' });
		}
		const trophies = profile.trophies.filter(
			(trophy) => trophy.userSeen !== true
		);
		res.status(200).send(trophies);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

// Get all Trophies

router.get('/api/trophies/all', async (req, res) => {
	try {
		const trophies = await Trophy.find();
		if (!trophies) {
			return res.status(404).send({ message: 'No Trophies...' });
		}
		res.status(200).send(trophies);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

module.exports = router;
