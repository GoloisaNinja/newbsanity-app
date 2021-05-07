import axios from 'axios';
import { ASSIGN_TROPHY, TROPHY_SEEN, GET_USER_TROPHIES } from './types';

// Get user trophies for display with modal at dashboard

export const getUserTrophies = () => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};

		const res = await axios.get(`/api/trophies/user`, config);
		if (res.status === 200) {
			dispatch({
				type: GET_USER_TROPHIES,
				payload: res.data,
			});
		}
	} catch (e) {
		console.log(e);
	}
};

// Assign a trophy to a user profile

export const assignTrophy = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};

		const res = await axios.post(`/api/trophies/assign/${id}`, config);
		if (res.status === 200) {
			dispatch({
				type: ASSIGN_TROPHY,
				payload: res.data,
			});
		}
	} catch (e) {
		console.log(e);
	}
};

// Mark a trophy as seen and remove it from the unseen trophies state array

export const seenTrophy = (id) => async (dispatch) => {
	const token = localStorage.getItem('token');

	try {
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};

		const res = await axios.post(`/api/trophies/markAsSeen/${id}`, config);
		if (res.status === 200) {
			dispatch({
				type: TROPHY_SEEN,
				payload: res.data,
			});
		}
	} catch (e) {
		console.log(e);
	}
};
