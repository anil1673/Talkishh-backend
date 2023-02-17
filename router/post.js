import express from "express";
import { verifyToken } from "../middleware/authenticate.js";
import {createPost,getFeedPosts,getUserPosts,likePost} from "../controller/post.js"
import userRouter from "./user.js";
import multer from "multer";
const postRouter=express.Router();




// create post
postRouter.post("/posts",verifyToken,createPost);
// get all post of user
postRouter.get("/",verifyToken,getFeedPosts);
// to get single post onwhich it ic clicked
postRouter.get("/:userId/posts",verifyToken,getUserPosts);
// 
postRouter.patch("/:id/like",verifyToken,likePost);





export default postRouter