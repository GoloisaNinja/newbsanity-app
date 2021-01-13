import axios from 'axios';
import {
  GET_POST,
  GET_ALL_POSTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_LIKES,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from './types';
import { setAlert } from './alert';

// Get all posts for forum page

export const getAllPosts = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = '';
    const res = await axios.get('/api/posts/all', body, config);
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Get single post by ID

export const getPost = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };

    const res = await axios.get(`/api/posts/post/${id}`, config);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new Post

export const createPost = (text) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = text;
    const res = await axios.post('/api/posts', body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete a Post

export const deletePost = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(`/api/posts/delete/${id}`, config);
    if (res.status === 200) {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(setAlert('Post dirty deleted...', 'success'));
    }
  } catch (e) {
    console.log(e);
  }
};

// Like a Post

export const likePost = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.post(`/api/posts/like/${id}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data,
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Unlike a Post

export const unlikePost = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.post(`/api/posts/unlike/${id}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        likes: res.data,
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Create a new Comment

export const createComment = (id, text) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = text;
    const res = await axios.post(`/api/posts/comment/${id}`, body, config);
    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// Delete a comment

export const deleteComment = (postId, commentId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.delete(
      `/api/posts/deletecomment/${postId}/${commentId}`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert('Comment dirty deleted...', 'success'));
    }
  } catch (e) {
    console.log(e);
  }
};
