import axios from 'axios';
import { ASSIGN_TROPHY, TROPHY_SEEN, GET_PROFILE } from './types';

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
			});
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		}
	} catch (e) {
		console.log(e);
	}
};
