import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    fetchAllUser
    } from "../controller/user.js"
    import { verifyToken } from "../middleware/authenticate.js";

    const userRouter=express.Router();

    // read
    userRouter.get("/:id",verifyToken,getUser);
    userRouter.get("/:id/friends",verifyToken,getUserFriends);
    userRouter.get("/",verifyToken,fetchAllUser);

    // update
    userRouter.patch("/:id/:friendId",verifyToken,addRemoveFriend);

    export default userRouter;
    