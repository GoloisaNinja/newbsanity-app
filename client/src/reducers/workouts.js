import {
	CREATE_WORKOUT,
	GET_USER_WORKOUTS,
	DELETE_WORKOUT,
	CLEAR_USER_WORKOUTS,
} from '../actions/types';

const initialState = {
	loading: true,
	workouts: [],
	workout: null,
	error: {},
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CREATE_WORKOUT:
			return {
				...state,
				workout: payload,
				loading: false,
			};
		case DELETE_WORKOUT:
			return {
				...state,
				loading: false,
				workouts: state.workouts.filter((workout) => workout._id !== payload),
			};
		case GET_USER_WORKOUTS:
			return {
				...state,
				loading: false,
				workouts: payload,
			};
		case CLEAR_USER_WORKOUTS:
			return {
				...state,
				loading: true,
				workouts: [],
				workout: null,
				error: {},
			};
		default:
			return state;
	}
}
