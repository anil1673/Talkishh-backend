import express from "express";
import multer from "multer";
//  import { upload } from "../app.js";
import { loginController, registerController } from "../controller/auth.js";

const authRouter=express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("multer", req)
      cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  

const upload=multer({storage});

// authRouter.post("/register",upload.single("picture"),registerController);
authRouter.post("/register",upload.single("picturePath"),registerController);
authRouter.post("/login",loginController);

export {authRouter}                                                                                                                                                         