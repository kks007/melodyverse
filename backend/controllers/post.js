import Post from "../models/Posts.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    handleError(500, err);
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const post = await post.findById(req.params.id);
    if (post.userId === req.body.id) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      handleError(500, err);
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    const post = await post.findById(req.params.id);
    if (!post.likes.includes(req.body.id)) {
      await post.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("post has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userposts = await post.find({ userId: currentUser._id });
    const followersposts = await Promise.all(
      currentUser.following.map((followerId) => {
        return post.find({ userId: followerId });
      })
    );

    res.status(200).json(userposts.concat(...followersposts));
  } catch (err) {
    handleError(500, err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const userposts = await post.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(userposts);
  } catch (err) {
    handleError(500, err);
  }
};
export const getExplorePosts = async (req, res, next) => {
  try {
    const getExploreposts = await post.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(getExploreposts);
  } catch (err) {
    handleError(500, err);
  }
};
