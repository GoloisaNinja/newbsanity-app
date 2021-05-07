import { GET_ADVICE } from '../actions/types';

const initialState = {
	loading: true,
	advice: null,
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_ADVICE:
			return {
				...state,
				loading: false,
				advice: payload,
			};
		default:
			return state;
	}
}
