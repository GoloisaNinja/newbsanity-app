import {
	ASSIGN_TROPHY,
	TROPHY_SEEN,
	GET_USER_TROPHIES,
} from '../actions/types';

const initialState = {
	loading: true,
	trophies: [],
	error: {},
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ASSIGN_TROPHY:
			return {
				...state,
				trophies: state.trophies.unshift(payload),
				loading: false,
			};
		case GET_USER_TROPHIES:
			return {
				...state,
				trophies: payload,
				loading: false,
			};
		case TROPHY_SEEN:
			return {
				...state,
				loading: false,
				trophies: state.trophies.filter(
					(trophy) => trophy.trophy !== payload._id
				),
			};
		default:
			return state;
	}
}
