import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createPost,
  deletePost,
  likeOrDislike,
  getAllPosts,
  getUserPosts,
  getExplorePosts,
} from "../controllers/post.js";

const router = express.Router();

// Create a post
router.post("/", verifyToken, createPost);

// Delete a post
router.delete("/:id", verifyToken, deletePost);

// Like or Dislike a post
router.put("/:id/like", likeOrDislike);

// get all timeline posts
router.get("/timeline/:id", getAllPosts);

// get user Posts only
router.get("/user/all/:id", getUserPosts);

//explore
router.get("/explore", getExplorePosts);
export default router;
