import Post from "../models/post.js";
import User from "../models/user.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

export const createPost = async (req, res) => {
    try {
      const { userId, caption,image } = req.body;

     

      const user = await User.findById(userId);
      console.log("fdfdf", image)

      
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description:caption,
        userPicturePath: user.picturePath,
        picturePath:image,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  
  /* READ */
  export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  export const getUserPosts = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await Post.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  
  /* UPDATE */
  export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };