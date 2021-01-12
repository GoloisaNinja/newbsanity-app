const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create new Post

router.post('/api/posts', auth, async (req, res) => {
  const text = req.body.text;
  const user = await req.user;
  const { name, id } = user;
  try {
    if (!user) {
      throw new Error('Please authenticate...');
    }
    const post = new Post({
      user: id,
      name,
      text,
    });
    await post.save();
    res.status(200).json(post);
  } catch (e) {
    console.error({ message: e.message });
    res.json({ message: e.message });
  }
});

// Delete a Post

router.delete('/api/posts/delete/:_id', auth, async (req, res) => {
  const _id = req.params._id;
  const user = await req.user;
  const { id } = user;
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).send({ message: 'Could not find post...' });
    }
    if (post.user.toString() !== id) {
      return res.status(403).send({ message: 'Not authorized' });
    }
    await post.remove();
    res.status(200).send({ message: 'Post successfully removed...' });
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Get all Posts

router.get('/api/posts/all', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(404).send({ message: 'No Posts...' });
    }
    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Get a Post by Id

router.get('/api/posts/post/:_id', auth, async (req, res) => {
  const _id = req.params._id;
  const user = await req.user;
  try {
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(200).send(post);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Like a Post

router.post('/api/posts/like/:postId', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.postId;
  try {
    const post = await Post.findById({ _id });
    const liked = post.likes.filter((like) => like.user.toString() === id);
    if (liked.length > 0) {
      return res.status(400).send({ message: 'You already like this post' });
    }
    post.likes.unshift({ user: id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Unlike a Post

router.post('/api/posts/unlike/:postId', auth, async (req, res) => {
  const user = await req.user;
  const { id } = user;
  const _id = req.params.postId;
  try {
    const post = await Post.findById({ _id });
    const liked = post.likes.filter((like) => like.user.toString() === id);
    if (liked.length === 0) {
      return res.status(400).send({ message: 'You have not liked this post' });
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== id);
    await post.save();
    res.status(200).json(post.likes);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Comment on a Post

router.post('/api/posts/comment/:postId', auth, async (req, res) => {
  const user = await req.user;
  const { name, id } = user;
  const _id = req.params.postId;
  const text = req.body.text;
  try {
    if (!user) {
      return res.status(201).send({ message: 'Please authenticate ' });
    }
    const post = await Post.findById({ _id });
    if (!post) {
      return res.status(404).send({ message: 'Could not find post...' });
    }
    const comment = {
      user: id,
      name,
      text,
    };
    post.comments.unshift(comment);
    await post.save();
    res.status(200).send(post.comments);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(404).send({ message: 'Could not find post...' });
    }
    res.status(400).send({ message: e.message });
  }
});

// Delete a comment on a Post

router.delete(
  '/api/posts/deletecomment/:postId/:commentId',
  auth,
  async (req, res) => {
    const user = await req.user;
    const { id } = user;
    const postId = req.params.postId;
    const comId = req.params.commentId;
    try {
      if (!user) {
        return res.status(201).send({ message: 'Please authenticate ' });
      }
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send({ message: 'Could not find post...' });
      }
      const index = post.comments.findIndex(
        (comment) =>
          comment._id.toString() === comId && comment.user.toString() === id
      );
      console.log(index);
      if (index === -1) {
        return res.status(404).send({
          message: 'Could not find comment or not authorized to delete',
        });
      }
      post.comments.splice(index, 1);
      console.log(post.comments);
      await post.save();
      res
        .status(200)
        .send({ message: 'You thought better of that comment...' });
    } catch (e) {
      if (e.kind === 'ObjectId') {
        res.status(404).send({ message: 'Could not find post...' });
      }
      res.status(400).send({ message: e.message });
    }
  }
);

module.exports = router;
