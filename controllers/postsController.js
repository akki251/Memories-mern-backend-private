import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';

export const getPosts = catchAsync(async (req, res, next) => {
  const posts = await postMessage.find();

  res.status(200).json({
    status: 'success',
    data: posts,
    result: posts.length,
  });
});

export const createPost = catchAsync(async (req, res, next) => {
  const postData = req.body;

  const newPost = await postMessage.create(postData);

  res.status(201).json({
    status: 'success',
    message: 'Post Created',
    data: newPost,
  });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const { id: _id } = req.params;

  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(new appError('Post not Found', 404));
  }

  const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json({
    status: 'success',
    message: 'Post Updated',
    data: updatedPost,
  });
});

export const deleteAllPosts = catchAsync(async (req, res, next) => {
  await postMessage.deleteMany();

  res.json({
    status: 'success',
    message: 'Posts deleted',
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(new appError('No memory found with this ID', 404));
  }

  await postMessage.findByIdAndDelete(_id);

  res.status(200).json({
    status: 'success',
    message: 'Post Deleted',
  });
});

export const likePost = catchAsync(async (req, res, next) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return next(new appError('No memory found with this ID', 404));
  }

  const post = await postMessage.findById(_id);

  post.likeCount++;

  await post.save();

  res.status(200).json({
    status: 'success',
    message: 'Post like updated',
  });
});
