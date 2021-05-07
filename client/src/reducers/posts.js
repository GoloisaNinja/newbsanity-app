import {
	GET_POST,
	GET_ALL_POSTS,
	CREATE_POST,
	DELETE_POST,
	CLEAR_POSTS,
	UPDATE_LIKES,
	CREATE_COMMENT,
	DELETE_COMMENT,
	ADMIN_DELETE_POST,
} from '../actions/types';

const initialState = {
	loading: true,
	posts: [],
	post: null,
	error: {},
};

export default function foo(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false,
			};
		case GET_ALL_POSTS:
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case CREATE_POST:
			return {
				...state,
				posts: [payload, ...state.posts],
				loading: false,
			};
		case DELETE_POST:
		case ADMIN_DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
				loading: false,
			};
		case CREATE_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payload },
				loading: false,
			};
		case DELETE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.filter(
						(comment) => comment._id !== payload
					),
				},
				loading: false,
			};
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false,
			};
		case CLEAR_POSTS:
			return {
				...state,
				posts: [],
				post: null,
				error: {},
				loading: false,
			};
		default:
			return state;
	}
}
